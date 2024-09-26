package com.tanay.microservices.projectservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String description;
    private String category;

    @ElementCollection
    private List<String> tags = new ArrayList<>();

    private Long ownerId;

    @ElementCollection
    private List<Long> issueIds = new ArrayList<>();

    @ElementCollection
    private List<Long> team = new ArrayList<>();

    private Long chatId;
}
