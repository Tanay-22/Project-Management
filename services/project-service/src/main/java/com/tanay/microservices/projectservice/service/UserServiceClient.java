package com.tanay.microservices.projectservice.service;

import com.tanay.microservices.projectservice.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-service", url = "http://localhost:8000")
public interface UserServiceClient
{
    @GetMapping("/api/users/profile")
    UserDTO getUserProfile(@RequestHeader("Authorization") String jwt);
}
