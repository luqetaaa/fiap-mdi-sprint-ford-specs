package com.fordchallenge.ford_competitive_api.vehicles.dto;

import java.util.Map;
public record VehicleResponse(Long id, String marca, String modelo, Integer ano,
    String versao, Map<String, String> specs, String fonte, boolean demonstrativo) {}
