package com.tanay.microservices.issueservice.service;

import com.tanay.microservices.issueservice.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@Service
@FeignClient(name = "user-service", url = "http://localhost:8000")
public interface UserServiceClient
{
    @GetMapping("/api/users/profile")
    UserDTO getUserProfile(@RequestHeader("Authorization") String jwt);
}
