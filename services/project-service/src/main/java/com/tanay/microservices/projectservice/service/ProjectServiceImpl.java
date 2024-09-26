package com.tanay.microservices.projectservice.service;

import com.tanay.microservices.projectservice.dto.UserDTO;
import com.tanay.microservices.projectservice.model.Project;
import com.tanay.microservices.projectservice.repository.ProjectRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService
{
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository)
    {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project createProject(Project project, UserDTO user) throws Exception
    {
        Project createdProject = new Project();

        createdProject.setOwnerId(user.getId());
        createdProject.setTags(project.getTags());
        createdProject.setName(project.getName());
        createdProject.setCategory(project.getCategory());
        createdProject.setDescription(project.getDescription());
        createdProject.getTeam().add(user.getId());

        Project savedProject = projectRepository.save(createdProject);

//        Chat chat = new Chat();
//        chat.setProject(savedProject);
//
//        Chat projectChat = chatService.createChat(chat);
//        savedProject.setChat(projectChat);

        return savedProject;
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