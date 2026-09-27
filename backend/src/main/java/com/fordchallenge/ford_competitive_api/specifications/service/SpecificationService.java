package com.fordchallenge.ford_competitive_api.specifications.service;

import java.util.Map;
import com.fordchallenge.ford_competitive_api.vehicles.service.VehicleService;
import org.springframework.stereotype.Service;
@Service
public class SpecificationService {
    private final VehicleService vehicles;
    public SpecificationService(VehicleService vehicles) { this.vehicles = vehicles; }
    public Map<String, String> findByVehicleId(Long id) { return vehicles.findById(id).specs(); }
}
