package com.fordchallenge.ford_competitive_api.security;

import com.fordchallenge.ford_competitive_api.users.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class CurrentUser {
    public User get() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User user))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Entre para continuar.");
        return user;
    }
}
