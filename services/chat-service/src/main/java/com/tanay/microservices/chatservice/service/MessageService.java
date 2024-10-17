package com.tanay.microservices.chatservice.service;

import com.tanay.microservices.chatservice.dto.ProjectDTO;
import com.tanay.microservices.chatservice.dto.UserDTO;
import com.tanay.microservices.chatservice.model.Message;

import java.util.List;

public interface MessageService
{
    Message sendMessage(UserDTO sender, ProjectDTO project, String content) throws Exception;

    List<Message> getMessagesByProject(ProjectDTO project) throws Exception;
}