package com.fordchallenge.ford_competitive_api.vehicles.dto;

import java.util.List;
import jakarta.validation.constraints.*;
public record VehicleSearchRequest(
    @NotBlank String marca,
    @NotBlank String modelo,
    @NotNull @Min(1886) @Max(2100) Integer ano,
    @NotBlank String versao,
    @Size(max = 50) List<@NotBlank String> selectedFields
) {}
