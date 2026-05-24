package com.fordchallenge.ford_competitive_api.auth.controller;

import com.fordchallenge.ford_competitive_api.auth.dto.AuthResponse;
import com.fordchallenge.ford_competitive_api.auth.dto.LoginRequest;
import com.fordchallenge.ford_competitive_api.auth.dto.RegisterRequest;
import com.fordchallenge.ford_competitive_api.auth.service.AuthService;
import com.fordchallenge.ford_competitive_api.users.entity.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody @Valid RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid LoginRequest request) {

        return authService.login(request);
    }
}