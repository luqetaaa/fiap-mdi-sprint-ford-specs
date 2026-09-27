package com.fordchallenge.ford_competitive_api.searches.dto;

import java.time.Instant;
import java.util.List;
import com.fordchallenge.ford_competitive_api.vehicles.dto.VehicleResponse;
public record SearchHistoryResponse(Long id, Instant createdAt, VehicleResponse vehicle, List<String> selectedFields) {}
