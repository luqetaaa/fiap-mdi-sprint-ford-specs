package com.fordchallenge.ford_competitive_api.vehicles.service;

import java.util.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fordchallenge.ford_competitive_api.vehicles.dto.VehicleResponse;
import com.fordchallenge.ford_competitive_api.vehicles.entity.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleMapper {
    private final ObjectMapper json;
    public VehicleMapper(ObjectMapper json) { this.json = json; }
    public VehicleResponse map(Vehicle vehicle) {
        Map<String, String> fields = new LinkedHashMap<>();
        var specs = vehicle.getSpecs();
        String source = "Fonte não informada";
        boolean demo = true;
        if (specs != null) {
            if (specs.getDetalhesJson() != null) {
                try { fields = json.readValue(specs.getDetalhesJson(), new TypeReference<LinkedHashMap<String, String>>() {}); }
                catch (Exception ex) { throw new IllegalStateException("Catálogo inválido", ex); }
            } else {
                fields.put("potencia", specs.getPotencia());
                fields.put("torque", specs.getTorque());
                fields.put("transmissao", specs.getCambio());
                fields.put("combustivel", specs.getCombustivel());
                fields.put("consumo", specs.getConsumo());
            }
            source = specs.getFonteUrl();
            demo = !Boolean.FALSE.equals(specs.getDemonstrativo());
        }
        return new VehicleResponse(vehicle.getId(), vehicle.getMarca(), vehicle.getModelo(),
            vehicle.getAno(), vehicle.getVersao(), fields, source, demo);
    }
}
