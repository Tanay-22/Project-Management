package com.tanay.microservices.chatservice.service;

import com.tanay.microservices.chatservice.model.Chat;

public interface ChatService
{
    Chat createChat(Chat chat);
}