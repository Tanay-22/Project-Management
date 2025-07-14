package com.tanay.microservices.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfig
{
    @Bean
    public RouteLocator gatewayLocator(RouteLocatorBuilder builder)
    {
        return builder.routes()
                .route("user-service", r -> r.path("/auth/**")
                        .uri("http://localhost:8000"))

                .route("user-service", r -> r.path("/api/users/**")
                        .uri("http://localhost:8000"))

                .route("project-service", r -> r.path("/api/projects/**")
                        .uri("http://localhost:8100"))

                .route("issue-service", r -> r.path("/api/issue/**")
                        .uri("http://localhost:8200"))

                .route("chat-service", r -> r.path("/api/chat/**")
                        .uri("http://localhost:8300"))

                .route("subscription-service", r -> r.path("/api/subscription/**")
                        .uri("http://localhost:8400"))
                .build();
    }
}
