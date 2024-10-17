package com.tanay.microservices.projectservice.controller;

import com.tanay.microservices.projectservice.dto.UserDTO;
import com.tanay.microservices.projectservice.model.Invitation;
import com.tanay.microservices.projectservice.model.Project;
import com.tanay.microservices.projectservice.request.CreateProjectRequest;
import com.tanay.microservices.projectservice.request.InviteRequest;
import com.tanay.microservices.projectservice.response.MessageResponse;
import com.tanay.microservices.projectservice.service.InvitationService;
import com.tanay.microservices.projectservice.service.ProjectService;
import com.tanay.microservices.projectservice.service.UserServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tanay.microservices.projectservice.config.JwtConstant.JWT_HEADER;

@RestController
@RequestMapping("/api/projects")
public class ProjectController
{
    private final ProjectService projectService;
    private final UserServiceClient userServiceClient;
    private final InvitationService invitationService;


    @Autowired
    public ProjectController(ProjectService projectService, UserServiceClient userServiceClient,
                             InvitationService invitationService)
    {
        this.projectService = projectService;
        this.userServiceClient = userServiceClient;
        this.invitationService = invitationService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(@RequestParam(required = false) String category,
                                                     @RequestParam(required = false) String tag,
                                                     @RequestHeader(JWT_HEADER) String jwt)
            throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);
        List<Project> projects = projectService.getProjectByTeam(user, category, tag);

        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long projectId)
            throws Exception
    {
        Project project = projectService.getProjectById(projectId);

        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody CreateProjectRequest req,
                                                 @RequestHeader(JWT_HEADER) String jwt)
            throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);
        Project createdProject = projectService.createProject(req, user);

        return new ResponseEntity<>(createdProject, HttpStatus.OK);

    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(@RequestBody Project project,
                                                 @PathVariable Long projectId)
            throws Exception
    {
        Project updatedProject = projectService.updateProject(project, projectId);

        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    // upon deleting the project, its issues, chat, comments etc should get deleted too
    @DeleteMapping("/{projectId}")
    public ResponseEntity<MessageResponse> deleteProject(@PathVariable Long projectId,
                                                         @RequestHeader(JWT_HEADER) String jwt)
            throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);
        projectService.deleteProject(projectId, user);

        MessageResponse res = new MessageResponse("Project deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(@RequestParam(required = false) String keyword,
                                                        @RequestHeader(JWT_HEADER) String jwt)
            throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);
        List<Project> projects = projectService.searchProjects(keyword, user);

        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    /*@GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatByProjectId(@PathVariable Long projectId,
                                                  @RequestHeader(JwtConstant.JWT_HEADER) String jwt)
            throws Exception
    {
        User user = userService.findUserProfileByJwt(jwt);
        Chat chat = projectService.getChatByProjectId(projectId);

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }*/

    @PostMapping("/invite")
    public ResponseEntity<MessageResponse> inviteProject(@RequestBody InviteRequest req,
                                                         @RequestHeader(JWT_HEADER) String jwt)
            throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);
        invitationService.sendInvitation(req.getEmail(), req.getProjectId(), req.getBaseUrl());
        MessageResponse res = new MessageResponse("User invitation sent");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation> acceptInviteProject(@RequestParam String token,
                                                          @RequestHeader(JWT_HEADER) String jwt)
            throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);
        Invitation invitation = invitationService.acceptInvitation(token, user);
        projectService.addUserToProject(invitation.getProjectId(), user);

        return new ResponseEntity<>(invitation, HttpStatus.ACCEPTED);
    }
}
