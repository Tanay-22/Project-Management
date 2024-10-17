package com.tanay.microservices.projectservice.service;

import com.tanay.microservices.projectservice.dto.UserDTO;
import com.tanay.microservices.projectservice.model.Project;
import com.tanay.microservices.projectservice.request.CreateProjectRequest;

import java.util.List;

public interface ProjectService
{
    Project createProject(CreateProjectRequest req, UserDTO user) throws Exception;

    List<Project> getProjectByTeam(UserDTO user, String category, String tag) throws Exception;

    Project getProjectById(Long projectId) throws Exception;

    void deleteProject(Long projectId, UserDTO user) throws Exception;

    Project updateProject(Project updatedProject, Long id) throws Exception;

    void addUserToProject(Long projectId, UserDTO user) throws Exception;

    void removeUserFromProject(Long projectId, UserDTO user) throws Exception;

    Long getChatByProjectId(Long projectId) throws Exception;

    List<Project> searchProjects(String keyword, UserDTO user) throws Exception;
}