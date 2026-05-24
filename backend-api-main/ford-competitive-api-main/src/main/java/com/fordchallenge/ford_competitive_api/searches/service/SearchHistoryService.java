package com.fordchallenge.ford_competitive_api.searches.service;

import com.fordchallenge.ford_competitive_api.searches.dto.SearchHistoryResponse;
import com.fordchallenge.ford_competitive_api.searches.entity.SearchHistory;
import com.fordchallenge.ford_competitive_api.searches.repository.SearchHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;

    public SearchHistoryService(SearchHistoryRepository searchHistoryRepository) {
        this.searchHistoryRepository = searchHistoryRepository;
    }

    public List<SearchHistoryResponse> findAll() {
        return searchHistoryRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private SearchHistoryResponse mapToResponse(SearchHistory history) {
        return new SearchHistoryResponse(
                history.getId(),
                history.getTermoBusca(),
                history.getUser() != null ? history.getUser().getId() : null,
                history.getVehicle() != null ? history.getVehicle().getId() : null,
                history.getVehicle() != null ? history.getVehicle().getMarca() : null,
                history.getVehicle() != null ? history.getVehicle().getModelo() : null,
                history.getVehicle() != null ? history.getVehicle().getAno() : null,
                history.getVehicle() != null ? history.getVehicle().getVersao() : null,
                history.getCreatedAt()
        );
    }
}