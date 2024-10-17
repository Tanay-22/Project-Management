package com.tanay.microservices.subscriptionservice.service;

import com.tanay.microservices.subscriptionservice.SubscriptionRepository;
import com.tanay.microservices.subscriptionservice.model.PlanType;
import com.tanay.microservices.subscriptionservice.model.Subscription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubscriptionServiceImpl implements SubscriptionService
{
    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository)
    {
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public Subscription createSubscription(Long userId)
    {
        Subscription subscription = new Subscription();
        subscription.setUserId(userId);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusYears(1));
        subscription.setPlanType(PlanType.FREE);
        subscription.setValid(true);

        return subscription;
    }

    @Override
    public Subscription getUserSubscription(Long userId)
    {
        return subscriptionRepository.findByUserId(userId);
    }

    @Override
    public Subscription upgradeSubscription(Long userId, PlanType planType)
    {
        Subscription subscription = subscriptionRepository.findByUserId(userId);
        subscription.setPlanType(planType);
        subscription.setStartDate(LocalDate.now());

        if(planType.equals(PlanType.ANNUALLY))
            subscription.setEndDate(LocalDate.now().plusYears(1));
        else
            subscription.setEndDate(LocalDate.now().plusMonths(1));

        return subscriptionRepository.save(subscription);
    }

    @Override
    public Boolean isValid(Subscription subscription)
    {
        if(subscription.getPlanType().equals(PlanType.FREE))
            return true;

        LocalDate endDate = subscription.getEndDate();
        LocalDate currentDate = LocalDate.now();

        return endDate.isAfter(currentDate) || endDate.isEqual(currentDate);
    }
}
