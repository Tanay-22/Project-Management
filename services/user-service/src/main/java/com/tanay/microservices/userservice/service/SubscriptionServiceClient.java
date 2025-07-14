package com.tanay.microservices.userservice.service;

import com.tanay.microservices.userservice.dto.SubscriptionDTO;
import com.tanay.microservices.userservice.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;

@Service
@FeignClient(name = "subscription-service", url = "http://localhost:8400")
public interface SubscriptionServiceClient
{

    SubscriptionDTO createUserSubscription(User user);
}
