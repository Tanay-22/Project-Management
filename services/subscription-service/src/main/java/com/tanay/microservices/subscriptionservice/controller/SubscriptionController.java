package com.tanay.microservices.subscriptionservice.controller;

import com.tanay.microservices.subscriptionservice.dto.UserDTO;
import com.tanay.microservices.subscriptionservice.model.PlanType;
import com.tanay.microservices.subscriptionservice.model.Subscription;
import com.tanay.microservices.subscriptionservice.service.SubscriptionService;
import com.tanay.microservices.subscriptionservice.service.UserServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.tanay.microservices.subscriptionservice.config.JwtConstants.JWT_HEADER;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController
{
    private final SubscriptionService subscriptionService;
    private final UserServiceClient userServiceClient;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService, UserServiceClient userServiceClient)
    {
        this.subscriptionService = subscriptionService;
        this.userServiceClient = userServiceClient;
    }

    @GetMapping("/user")
    public ResponseEntity<Subscription> getUserSubscription(@RequestHeader(JWT_HEADER) String jwt)
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);

        Subscription subscription = subscriptionService.getUserSubscription(user.getId());

        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }

    @PatchMapping("/user")
    public ResponseEntity<Subscription> upgradeSubscription(@RequestHeader(JWT_HEADER) String jwt,
                                                            @RequestParam PlanType planType)
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);

        Subscription subscription = subscriptionService.upgradeSubscription(user.getId(), planType);

        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }
}
