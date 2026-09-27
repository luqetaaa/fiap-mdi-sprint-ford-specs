package com.fordchallenge.ford_competitive_api.config;

import java.util.Arrays;
import java.util.List;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.web.cors.*;

@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource(Environment environment) {
        var config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(environment.getProperty("app.cors-origins",
            "http://localhost:8081,http://localhost:19006").split(",")));
        config.setAllowedMethods(List.of("GET", "POST", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
