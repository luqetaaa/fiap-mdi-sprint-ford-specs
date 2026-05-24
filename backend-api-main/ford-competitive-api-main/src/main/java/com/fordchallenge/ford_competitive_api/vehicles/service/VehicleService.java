package com.fordchallenge.ford_competitive_api.vehicles.service;

import com.fordchallenge.ford_competitive_api.searches.entity.SearchHistory;
import com.fordchallenge.ford_competitive_api.searches.repository.SearchHistoryRepository;
import com.fordchallenge.ford_competitive_api.users.entity.User;
import com.fordchallenge.ford_competitive_api.users.repository.UserRepository;
import com.fordchallenge.ford_competitive_api.vehicles.dto.VehicleResponse;
import com.fordchallenge.ford_competitive_api.vehicles.dto.VehicleSearchRequest;
import com.fordchallenge.ford_competitive_api.vehicles.entity.Vehicle;
import com.fordchallenge.ford_competitive_api.vehicles.entity.VehicleSpec;
import com.fordchallenge.ford_competitive_api.vehicles.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final SearchHistoryRepository searchHistoryRepository;
    private final UserRepository userRepository;

    public VehicleService(
            VehicleRepository vehicleRepository,
            SearchHistoryRepository searchHistoryRepository,
            UserRepository userRepository
    ) {
        this.vehicleRepository = vehicleRepository;
        this.searchHistoryRepository = searchHistoryRepository;
        this.userRepository = userRepository;
    }

    public List<VehicleResponse> findAll() {
        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public VehicleResponse findById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        return mapToResponse(vehicle);
    }

    public VehicleResponse searchVehicle(VehicleSearchRequest request) {

        Vehicle vehicle = vehicleRepository
                .findByMarcaIgnoreCaseAndModeloIgnoreCaseAndAnoAndVersaoIgnoreCase(
                        request.marca(),
                        request.modelo(),
                        request.ano(),
                        request.versao()
                )
                .orElseGet(() -> createMockVehicle(request));

        saveSearchHistory(request, vehicle);

        return mapToResponse(vehicle);
    }

    private Vehicle createMockVehicle(VehicleSearchRequest request) {

        Vehicle vehicle = Vehicle.builder()
                .marca(request.marca())
                .modelo(request.modelo())
                .ano(request.ano())
                .versao(request.versao())
                .build();

        VehicleSpec spec = VehicleSpec.builder()
                .potencia("180cv")
                .torque("27kgfm")
                .combustivel("Flex")
                .cambio("Automático")
                .consumo("11km/l")
                .fonteUrl("https://mock-api.ford-challenge.com")
                .vehicle(vehicle)
                .build();

        vehicle.setSpecs(spec);

        return vehicleRepository.save(vehicle);
    }

    private void saveSearchHistory(
            VehicleSearchRequest request,
            Vehicle vehicle
    ) {

        User user = userRepository.findById(1L)
                .orElse(null);

        SearchHistory history = SearchHistory.builder()
                .termoBusca(
                        request.marca() + " "
                                + request.modelo() + " "
                                + request.versao()
                )
                .vehicle(vehicle)
                .user(user)
                .build();

        searchHistoryRepository.save(history);
    }

    private VehicleResponse mapToResponse(Vehicle vehicle) {

        return new VehicleResponse(
                vehicle.getId(),
                vehicle.getMarca(),
                vehicle.getModelo(),
                vehicle.getAno(),
                vehicle.getVersao(),
                vehicle.getSpecs().getPotencia(),
                vehicle.getSpecs().getTorque(),
                vehicle.getSpecs().getCombustivel(),
                vehicle.getSpecs().getCambio(),
                vehicle.getSpecs().getConsumo()
        );
    }
}