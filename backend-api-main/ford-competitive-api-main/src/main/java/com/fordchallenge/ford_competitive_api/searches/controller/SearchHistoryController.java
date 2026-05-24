package com.fordchallenge.ford_competitive_api.searches.controller;

import com.fordchallenge.ford_competitive_api.searches.dto.SearchHistoryResponse;
import com.fordchallenge.ford_competitive_api.searches.service.SearchHistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/searches")
public class SearchHistoryController {

    private final SearchHistoryService searchHistoryService;

    public SearchHistoryController(SearchHistoryService searchHistoryService) {
        this.searchHistoryService = searchHistoryService;
    }

    @GetMapping("/history")
    public List<SearchHistoryResponse> findAll() {
        return searchHistoryService.findAll();
    }
}