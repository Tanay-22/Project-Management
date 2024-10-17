package com.tanay.microservices.chatservice.service;

import com.tanay.microservices.chatservice.model.Chat;
import com.tanay.microservices.chatservice.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService
{
    private final ChatRepository chatRepository;

    @Autowired
    public ChatServiceImpl(ChatRepository chatRepository)
    {
        this.chatRepository = chatRepository;
    }

    @Override
    public Chat createChat(Chat chat)
    {
        return chatRepository.save(chat);
    }
}