package com.tanay.microservices.issueservice.service;

import com.tanay.microservices.issueservice.dto.ProjectDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@FeignClient(name = "project-service", url = "http://localhost:8100")
public interface ProjectServiceClient
{
    @GetMapping("/api/projects/{projectId}")
    ProjectDTO getProjectById(@PathVariable Long projectId);
}
