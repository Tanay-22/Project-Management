package com.tanay.microservices.chatservice.controller;

import com.tanay.microservices.chatservice.dto.ProjectDTO;
import com.tanay.microservices.chatservice.dto.UserDTO;
import com.tanay.microservices.chatservice.model.Message;
import com.tanay.microservices.chatservice.request.CreateMessageRequest;
import com.tanay.microservices.chatservice.service.MessageService;
import com.tanay.microservices.chatservice.service.ProjectServiceClient;
import com.tanay.microservices.chatservice.service.UserServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController
{
    private final MessageService messageService;
    private final UserServiceClient userServiceClient;
    private final ProjectServiceClient projectServiceClient;
    private static final String JWT_HEADER = "Authorization";

    @Autowired
    public MessageController(MessageService messageService, UserServiceClient userServiceClient, ProjectServiceClient projectServiceClient)
    {
        this.messageService = messageService;
        this.userServiceClient = userServiceClient;
        this.projectServiceClient = projectServiceClient;
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody CreateMessageRequest req,
                                               @RequestHeader(JWT_HEADER) String jwt) throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);
        ProjectDTO project = projectServiceClient.getProjectById(req.getProjectId());

        if(user == null)
            throw new Exception("USER NOT FOUND WITH ID - " + req.getSenderId());

        if(project == null)
            throw new Exception("PROJECT FOUND WITH ID - " + req.getProjectId());

        Message sentMessage = messageService.sendMessage(user, project, req.getContent());

        return ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable Long projectId) throws Exception
    {
        ProjectDTO project = projectServiceClient.getProjectById(projectId);
        List<Message> messages = messageService.getMessagesByProject(project);

        return ResponseEntity.ok(messages);
    }
}