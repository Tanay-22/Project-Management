package com.tanay.microservices.chatservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO
{
    private Long id;
    private String name;
    private String description;
    private String category;
    private Long chatId;
}
