package com.fordchallenge.ford_competitive_api.auth.dto;

import com.fordchallenge.ford_competitive_api.users.entity.User;
public record UserResponse(Long id, String nome, String email) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getNome(), user.getEmail());
    }
}
