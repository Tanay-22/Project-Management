package com.tanay.microservices.projectservice.dto;

import com.tanay.microservices.projectservice.model.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO
{
    private Long id;
    private String name;
    private Project project;
}
