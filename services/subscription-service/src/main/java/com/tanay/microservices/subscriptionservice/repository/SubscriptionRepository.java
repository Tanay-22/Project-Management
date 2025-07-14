package com.tanay.microservices.subscriptionservice.repository;

import com.tanay.microservices.subscriptionservice.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long>
{
    Subscription findByUserId(Long userId);
}
