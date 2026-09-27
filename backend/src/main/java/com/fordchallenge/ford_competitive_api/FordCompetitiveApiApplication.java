package com.fordchallenge.ford_competitive_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration.class)
public class FordCompetitiveApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FordCompetitiveApiApplication.class, args);
	}

}
