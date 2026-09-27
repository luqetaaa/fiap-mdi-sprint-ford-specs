package com.fordchallenge.ford_competitive_api.searches.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fordchallenge.ford_competitive_api.searches.dto.SearchHistoryResponse;
import com.fordchallenge.ford_competitive_api.searches.entity.SearchHistory;
import com.fordchallenge.ford_competitive_api.searches.repository.SearchHistoryRepository;
import com.fordchallenge.ford_competitive_api.security.CurrentUser;
import com.fordchallenge.ford_competitive_api.vehicles.entity.Vehicle;
import com.fordchallenge.ford_competitive_api.vehicles.service.VehicleMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
@Transactional
public class SearchHistoryService {
    private final SearchHistoryRepository repository;
    private final CurrentUser currentUser;
    private final VehicleMapper mapper;
    private final ObjectMapper json;
    public SearchHistoryService(SearchHistoryRepository repository, CurrentUser currentUser, VehicleMapper mapper, ObjectMapper json) {
        this.repository = repository; this.currentUser = currentUser; this.mapper = mapper; this.json = json;
    }
    public SearchHistoryResponse save(Vehicle vehicle, List<String> selectedFields) {
        try {
            var fields = selectedFields == null ? List.<String>of() : selectedFields.stream().distinct().toList();
            var history = SearchHistory.builder().vehicle(vehicle).user(currentUser.get())
                .termoBusca(vehicle.getMarca() + " " + vehicle.getModelo() + " " + vehicle.getVersao())
                .selectedFieldsJson(json.writeValueAsString(fields)).build();
            return map(repository.save(history));
        } catch (com.fasterxml.jackson.core.JsonProcessingException ex) { throw new IllegalStateException(ex); }
    }
    @Transactional(readOnly = true)
    public List<SearchHistoryResponse> findAll() {
        return repository.findTop100ByUserIdOrderByCreatedAtDescIdDesc(currentUser.get().getId()).stream()
            .filter(h -> h.getVehicle() != null).map(this::map).toList();
    }
    public void clear() { repository.deleteByUserId(currentUser.get().getId()); }
    private SearchHistoryResponse map(SearchHistory history) {
        List<String> fields = List.of();
        if (history.getSelectedFieldsJson() != null) {
            try { fields = json.readValue(history.getSelectedFieldsJson(), new TypeReference<List<String>>() {}); }
            catch (Exception ex) { throw new IllegalStateException("Histórico inválido", ex); }
        }
        return new SearchHistoryResponse(history.getId(), history.getCreatedAt(), mapper.map(history.getVehicle()), fields);
    }
}
