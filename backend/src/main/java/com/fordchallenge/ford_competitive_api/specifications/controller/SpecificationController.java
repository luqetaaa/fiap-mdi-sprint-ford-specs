package com.fordchallenge.ford_competitive_api.specifications.controller;

import com.fordchallenge.ford_competitive_api.specifications.dto.SpecificationResponse;
import com.fordchallenge.ford_competitive_api.specifications.service.SpecificationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/specifications")
public class SpecificationController {

    private final SpecificationService specificationService;

    public SpecificationController(SpecificationService specificationService) {
        this.specificationService = specificationService;
    }

    @GetMapping("/{vehicleId}")
    public java.util.Map<String, String> findByVehicleId(
            @PathVariable Long vehicleId
    ) {
        return specificationService.findByVehicleId(vehicleId);
    }
}