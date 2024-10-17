package com.tanay.microservices.chatservice.repository;

import com.tanay.microservices.chatservice.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long>
{
    Chat findByProjectId(Long projectId);

    Chat getChatByProjectId(Long projectId);
}