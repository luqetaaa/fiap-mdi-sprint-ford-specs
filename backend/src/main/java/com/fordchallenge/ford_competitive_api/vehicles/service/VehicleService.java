package com.fordchallenge.ford_competitive_api.vehicles.service;

import java.util.List;
import com.fordchallenge.ford_competitive_api.searches.dto.SearchHistoryResponse;
import com.fordchallenge.ford_competitive_api.searches.service.SearchHistoryService;
import com.fordchallenge.ford_competitive_api.vehicles.dto.*;
import com.fordchallenge.ford_competitive_api.vehicles.entity.Vehicle;
import com.fordchallenge.ford_competitive_api.vehicles.repository.VehicleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional(readOnly = true)
public class VehicleService {
    private final VehicleRepository repository;
    private final VehicleMapper mapper;
    private final SearchHistoryService history;
    public VehicleService(VehicleRepository repository, VehicleMapper mapper, SearchHistoryService history) {
        this.repository = repository; this.mapper = mapper; this.history = history;
    }
    private boolean isValid(Vehicle vehicle) {
        return vehicle.getSpecs() != null && (vehicle.getSpecs().getFonteUrl() == null ||
            !vehicle.getSpecs().getFonteUrl().contains("mock-api.ford-challenge.com"));
    }
    public List<VehicleResponse> findAll() {
        return repository.findAll().stream().filter(this::isValid).map(mapper::map).toList();
    }
    public VehicleResponse findById(Long id) {
        return mapper.map(repository.findById(id).filter(this::isValid).orElseThrow(this::notFound));
    }
    @Transactional
    public SearchHistoryResponse searchVehicle(VehicleSearchRequest request) {
        var vehicle = repository.findByMarcaIgnoreCaseAndModeloIgnoreCaseAndAnoAndVersaoIgnoreCase(
            request.marca().trim(), request.modelo().trim(), request.ano(), request.versao().trim())
            .filter(this::isValid).orElseThrow(this::notFound);
        return history.save(vehicle, request.selectedFields());
    }
    private ResponseStatusException notFound() {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, "Veículo não encontrado no catálogo.");
    }
}
