package com.tanay.microservices.chatservice.service;

import com.tanay.microservices.chatservice.dto.ProjectDTO;
import com.tanay.microservices.chatservice.dto.UserDTO;
import com.tanay.microservices.chatservice.model.Chat;
import com.tanay.microservices.chatservice.model.Message;
import com.tanay.microservices.chatservice.repository.ChatRepository;
import com.tanay.microservices.chatservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService
{
    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository, ChatRepository chatRepository)
    {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
    }

    @Override
    public Message sendMessage(UserDTO sender, ProjectDTO project, String content) throws Exception
    {
        Long chatId = project.getChatId();
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() ->new Exception("Chat not found"));

        Message message = new Message();
        message.setContent(content);
        message.setSenderId(sender.getId());
        message.setCreatedAt(LocalDateTime.now());
        message.setChat(chat);

        Message savedMessage = messageRepository.save(message);
        chat.getMessages().add(savedMessage);

        return savedMessage;
    }

    @Override
    public List<Message> getMessagesByProject(ProjectDTO project) throws Exception
    {
        Chat chat = chatRepository.findByProjectId(project.getId());

        return messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
    }
}