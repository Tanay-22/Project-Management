package com.tanay.microservices.projectservice.service;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "chat-service", url = "http://localhost:")
public interface ChatServiceClient
{
}
