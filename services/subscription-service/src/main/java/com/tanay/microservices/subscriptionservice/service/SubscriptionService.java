package com.tanay.microservices.subscriptionservice.service;

import com.tanay.microservices.subscriptionservice.model.PlanType;
import com.tanay.microservices.subscriptionservice.model.Subscription;

public interface SubscriptionService
{
    Subscription createSubscription(Long userId);

    Subscription getUserSubscription(Long userId);

    Subscription upgradeSubscription(Long userId, PlanType planType);

    Boolean isValid(Subscription subscription);
}
