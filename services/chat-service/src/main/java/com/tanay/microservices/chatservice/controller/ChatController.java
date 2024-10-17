package com.tanay.microservices.chatservice.controller;

import com.tanay.microservices.chatservice.model.Chat;
import com.tanay.microservices.chatservice.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController
{
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService)
    {
        this.chatService = chatService;
    }

    @PostMapping("/{projectId}")
    public ResponseEntity<Chat> createChat(@PathVariable Long projectId)
    {
        Chat chat = new Chat();
        chat.setProjectId(projectId);
        chatService.createChat(chat);

        return new ResponseEntity<>(chat, HttpStatus.CREATED);
    }
}
