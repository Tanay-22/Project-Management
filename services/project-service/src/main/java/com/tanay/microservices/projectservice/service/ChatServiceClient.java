package com.tanay.microservices.projectservice.service;

import com.tanay.microservices.projectservice.dto.ChatDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "chat-service", url = "http://localhost:8300")
public interface ChatServiceClient
{
    @PostMapping("/api/chat/{projectId}")
    ChatDTO createChat(@PathVariable Long projectId);
}
