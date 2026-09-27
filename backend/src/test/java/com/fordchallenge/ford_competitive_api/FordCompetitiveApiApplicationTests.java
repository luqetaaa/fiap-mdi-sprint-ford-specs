package com.fordchallenge.ford_competitive_api;

import com.fasterxml.jackson.databind.*;
import com.fordchallenge.ford_competitive_api.vehicles.repository.VehicleRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("demo")
class FordCompetitiveApiApplicationTests {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper json;
    @Autowired VehicleRepository vehicles;

    private Map<String, String> credentials() {
        return Map.of("nome", "Analista de teste", "email", "teste-" + UUID.randomUUID() + "@example.com", "senha", "Teste123!");
    }
    private String login(Map<String, String> credentials) throws Exception {
        String raw = mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
            .content(json.writeValueAsString(credentials))).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        return json.readTree(raw).get("accessToken").asText();
    }
    private String account() throws Exception {
        var data = credentials();
        mvc.perform(post("/auth/register").contentType(MediaType.APPLICATION_JSON).content(json.writeValueAsString(data)))
            .andExpect(status().isCreated()).andExpect(jsonPath("$.senhaHash").doesNotExist());
        return login(data);
    }
    private JsonNode search(String token) throws Exception {
        var vehicle = vehicles.findAll().getFirst();
        var body = Map.of("marca", vehicle.getMarca(), "modelo", vehicle.getModelo(),
            "ano", vehicle.getAno(), "versao", vehicle.getVersao(), "selectedFields", List.of("motor", "potencia"));
        var raw = mvc.perform(post("/vehicles/search").header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON).content(json.writeValueAsString(body)))
            .andExpect(status().isOk()).andExpect(jsonPath("$.vehicle.specs.potencia").isNotEmpty())
            .andExpect(jsonPath("$.selectedFields[0]").value("motor"))
            .andReturn().getResponse().getContentAsString();
        return json.readTree(raw);
    }

    @Test void registrationLoginAndAuthenticatedProfile() throws Exception {
        String token = account();
        mvc.perform(get("/auth/me").header("Authorization", "Bearer " + token))
            .andExpect(status().isOk()).andExpect(jsonPath("$.nome").value("Analista de teste"))
            .andExpect(jsonPath("$.senhaHash").doesNotExist());
        mvc.perform(get("/auth/me")).andExpect(status().isUnauthorized());
    }
    @Test void duplicateEmailAndInvalidInputHaveActionableStatuses() throws Exception {
        var data = credentials();
        mvc.perform(post("/auth/register").contentType(MediaType.APPLICATION_JSON).content(json.writeValueAsString(data)))
            .andExpect(status().isCreated());
        mvc.perform(post("/auth/register").contentType(MediaType.APPLICATION_JSON).content(json.writeValueAsString(data)))
            .andExpect(status().isConflict());
        mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
            .content(json.writeValueAsString(Map.of("email", data.get("email"), "senha", "incorreta"))))
            .andExpect(status().isUnauthorized());
        mvc.perform(post("/auth/register").contentType(MediaType.APPLICATION_JSON)
            .content("{\"nome\":\"Teste\",\"email\":\"invalido\",\"senha\":\"1\"}"))
            .andExpect(status().isBadRequest());
    }
    @Test void searchAndHistoryPreserveSelectedAttributes() throws Exception {
        String token = account();
        var record = search(token);
        mvc.perform(get("/searches/history").header("Authorization", "Bearer " + token))
            .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].id").value(record.get("id").asLong()))
            .andExpect(jsonPath("$[0].selectedFields.length()").value(2))
            .andExpect(jsonPath("$[0].vehicle.demonstrativo").value(true));
    }
    @Test void unknownVehiclesAreNotCreatedWithInventedSpecifications() throws Exception {
        String token = account();
        long count = vehicles.count();
        mvc.perform(post("/vehicles/search").header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"marca\":\"Ford\",\"modelo\":\"NaoExiste\",\"ano\":2025,\"versao\":\"Teste\"}"))
            .andExpect(status().isNotFound());
        assertEquals(count, vehicles.count());
    }
    @Test void historyIsPrivateAndDeletionAffectsOnlyItsOwner() throws Exception {
        String first = account(), second = account();
        search(first);
        mvc.perform(get("/searches/history").header("Authorization", "Bearer " + second))
            .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(0));
        mvc.perform(delete("/searches/history").header("Authorization", "Bearer " + second)).andExpect(status().isNoContent());
        mvc.perform(get("/searches/history").header("Authorization", "Bearer " + first))
            .andExpect(jsonPath("$.length()").value(1));
        mvc.perform(delete("/searches/history").header("Authorization", "Bearer " + first)).andExpect(status().isNoContent());
        mvc.perform(get("/searches/history").header("Authorization", "Bearer " + first))
            .andExpect(jsonPath("$.length()").value(0));
    }
    @Test void expiredAndMalformedTokensReturn401InsteadOf500() throws Exception {
        var key = Keys.hmacShaKeyFor("exclusivo-para-demonstracao-local-nao-usar-em-producao-2026".getBytes(StandardCharsets.UTF_8));
        String expired = Jwts.builder().setSubject("expirado@example.com")
            .setExpiration(new Date(System.currentTimeMillis() - 60000)).signWith(key, SignatureAlgorithm.HS256).compact();
        for (String token : List.of("invalido", expired))
            mvc.perform(get("/vehicles").header("Authorization", "Bearer " + token)).andExpect(status().isUnauthorized());
    }
    @Test void catalogAndCorsPreflightWorkForTheApp() throws Exception {
        String token = account();
        mvc.perform(get("/vehicles").header("Authorization", "Bearer " + token))
            .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(25));
        mvc.perform(options("/vehicles/search").header("Origin", "http://localhost:8081")
            .header("Access-Control-Request-Method", "POST").header("Access-Control-Request-Headers", "authorization,content-type"))
            .andExpect(status().isOk()).andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:8081"));
    }
}
