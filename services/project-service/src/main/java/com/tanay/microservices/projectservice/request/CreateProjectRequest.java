package com.tanay.microservices.projectservice.request;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CreateProjectRequest
{
    private String name;
    private String description;
    private String category;
    private List<String> tags = new ArrayList<>();
    private Long ownerId;
    private Long chatId;
}
