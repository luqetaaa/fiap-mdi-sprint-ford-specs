package com.fordchallenge.ford_competitive_api.auth.service;

import com.fordchallenge.ford_competitive_api.auth.dto.AuthResponse;
import com.fordchallenge.ford_competitive_api.auth.dto.LoginRequest;
import com.fordchallenge.ford_competitive_api.auth.dto.RegisterRequest;
import com.fordchallenge.ford_competitive_api.security.JwtService;
import com.fordchallenge.ford_competitive_api.users.entity.User;
import com.fordchallenge.ford_competitive_api.users.entity.UserRole;
import com.fordchallenge.ford_competitive_api.users.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.fordchallenge.ford_competitive_api.auth.dto.UserResponse;
import java.util.Locale;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User register(RegisterRequest request) {
        validatePasswordLength(request.senha());

        if (userRepository.existsByEmail(request.email().trim().toLowerCase(Locale.ROOT))) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado.");
        }

        User user = User.builder()
                .nome(request.nome().trim())
                .email(request.email().trim().toLowerCase(Locale.ROOT))
                .senhaHash(passwordEncoder.encode(request.senha()))
                .role(UserRole.USER)
                .build();

        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {
        validatePasswordLength(request.senha());

        User user = userRepository.findByEmail(request.email().trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos."));

        boolean passwordMatches = passwordEncoder.matches(
                request.senha(),
                user.getSenhaHash()
        );

        if (!passwordMatches) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos.");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(token, "Bearer", UserResponse.from(user));
    }
    private void validatePasswordLength(String password) {
        if (password.getBytes(java.nio.charset.StandardCharsets.UTF_8).length > 72)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha muito longa. Use menos caracteres.");
    }
}