package com.tanay.microservices.userservice.dto;

import java.time.LocalDate;

public class SubscriptionDTO
{
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;
    private PlanTypeDTO planType;
    private boolean isValid;

    private Long userId;
}
