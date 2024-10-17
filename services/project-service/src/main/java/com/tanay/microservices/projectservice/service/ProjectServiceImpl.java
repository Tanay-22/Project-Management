package com.tanay.microservices.projectservice.service;

import com.tanay.microservices.projectservice.dto.ChatDTO;
import com.tanay.microservices.projectservice.dto.UserDTO;
import com.tanay.microservices.projectservice.model.Project;
import com.tanay.microservices.projectservice.repository.ProjectRepository;
import com.tanay.microservices.projectservice.request.CreateProjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService
{
    private final ProjectRepository projectRepository;
    private final ChatServiceClient chatServiceClient;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, ChatServiceClient chatServiceClient)
    {
        this.projectRepository = projectRepository;
        this.chatServiceClient = chatServiceClient;
    }

    @Override
    public Project createProject(CreateProjectRequest req, UserDTO user) throws Exception
    {
        Project project = new Project();
        // can use @Builder here
        project.setOwnerId(user.getId());
        project.setTags(req.getTags());
        project.setName(req.getName());
        project.setCategory(req.getCategory());
        project.setDescription(req.getDescription());
        project.getTeam().add(user.getId());
        Project savedProject = projectRepository.save(project);
        // project need to be saved in order to get id

        ChatDTO chat = chatServiceClient.createChat(savedProject.getId());
        project.setChatId(chat.getId());

        return projectRepository.save(savedProject);
    }

    @Override
    public List<Project> getProjectByTeam(UserDTO user, String category, String tag) throws Exception
    {
        List<Project> projects = projectRepository.findByTeamContainingOrOwnerId(user.getId(), user.getId());

        if(category != null)
            projects = projects.stream().filter(project -> project.getCategory().equals(category))
                    .collect(Collectors.toList());

        if(tag != null)
            projects = projects.stream().filter(project -> project.getTags().contains(tag))
                    .collect(Collectors.toList());

        return projects;
    }

    @Override
    public Project getProjectById(Long projectId) throws Exception
    {
        Optional<Project> opt = projectRepository.findById(projectId);
        if(opt.isEmpty())
            throw new Exception("Project not found");

        return opt.get();
    }

    @Override
    public void deleteProject(Long projectId, UserDTO user) throws Exception
    {
        projectRepository.deleteById(projectId);
    }

    @Override
    public Project updateProject(Project updatedProject, Long id) throws Exception
    {
        Project project = getProjectById(id);

        project.setName(updatedProject.getName());
        project.setDescription(updatedProject.getDescription());
        project.setTags(updatedProject.getTags());

        return projectRepository.save(project);
    }

    @Override
    public void addUserToProject(Long projectId, UserDTO user) throws Exception
    {
        Project project = getProjectById(projectId);

        for(Long memberId: project.getTeam())
        {
            if(memberId.equals(user.getId()))
                return;
        }
        project.getTeam().add(user.getId());
//        project.getChat().getUsers().add(user);
        projectRepository.save(project);
    }

    @Override
    public void removeUserFromProject(Long projectId, UserDTO user) throws Exception
    {
        Project project = getProjectById(projectId);
        project.getTeam().remove(user.getId());

        projectRepository.save(project);
    }

    @Override
    public Long getChatByProjectId(Long projectId) throws Exception
    {
        Project project = getProjectById(projectId);

        return project.getChatId();
    }

    @Override
    public List<Project> searchProjects(String keyword, UserDTO user) throws Exception
    {
        return projectRepository.findByNameContainingAndTeamContains(keyword, user.getId());
    }
}