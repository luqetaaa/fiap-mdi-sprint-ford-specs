package com.fordchallenge.ford_competitive_api.config;

import com.fasterxml.jackson.databind.*;
import com.fordchallenge.ford_competitive_api.vehicles.entity.*;
import com.fordchallenge.ford_competitive_api.vehicles.repository.VehicleRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@ConditionalOnProperty(name = "app.seed-catalog", havingValue = "true")
public class CatalogInitializer implements ApplicationRunner {
    private final VehicleRepository repository;
    private final ObjectMapper json;
    public CatalogInitializer(VehicleRepository repository, ObjectMapper json) { this.repository = repository; this.json = json; }
    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        try (var input = new ClassPathResource("catalog-demo.json").getInputStream()) {
            for (JsonNode row : json.readTree(input)) {
                String brand = row.get("marca").asText(), model = row.get("modelo").asText(), version = row.get("versao").asText();
                int year = row.get("ano").asInt();
                if (repository.findByMarcaIgnoreCaseAndModeloIgnoreCaseAndAnoAndVersaoIgnoreCase(brand, model, year, version).isPresent()) continue;
                var vehicle = Vehicle.builder().marca(brand).modelo(model).versao(version).ano(year).build();
                var spec = VehicleSpec.builder().vehicle(vehicle).demonstrativo(true)
                    .fonteUrl("Base demonstrativa do projeto FIAP; dados fornecidos no projeto original, sem verificação externa.")
                    .detalhesJson(json.writeValueAsString(row.get("specs"))).build();
                vehicle.setSpecs(spec);
                repository.save(vehicle);
            }
        }
    }
}
