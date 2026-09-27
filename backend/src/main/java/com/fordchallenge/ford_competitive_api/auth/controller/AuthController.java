package com.fordchallenge.ford_competitive_api.auth.controller;

import com.fordchallenge.ford_competitive_api.auth.dto.*;
import com.fordchallenge.ford_competitive_api.auth.service.AuthService;
import com.fordchallenge.ford_competitive_api.security.CurrentUser;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService service;
    private final CurrentUser currentUser;
    public AuthController(AuthService service, CurrentUser currentUser) {
        this.service = service;
        this.currentUser = currentUser;
    }
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody RegisterRequest request) {
        return UserResponse.from(service.register(request));
    }
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return service.login(request);
    }
    @GetMapping("/me")
    public UserResponse me() { return UserResponse.from(currentUser.get()); }
}
