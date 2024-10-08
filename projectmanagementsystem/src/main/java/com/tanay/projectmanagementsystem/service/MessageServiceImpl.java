package com.tanay.projectmanagementsystem.service;

import com.tanay.projectmanagementsystem.model.Chat;
import com.tanay.projectmanagementsystem.model.Message;
import com.tanay.projectmanagementsystem.model.User;
import com.tanay.projectmanagementsystem.repository.MessageRepository;
import com.tanay.projectmanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class MessageServiceImpl implements MessageService
{
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public Message sendMessage(Long senderId, Long projectId, String content) throws Exception
    {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new Exception("USER NOT FOUND WITH ID - " + senderId));

        Chat chat = projectService.getProjectById(projectId).getChat();

        Message message = new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setCreatedAt(LocalDateTime.now());
        message.setChat(chat);

        Message savedMessage = messageRepository.save(message);

        chat.getMessages().add(savedMessage);

        messagingTemplate.convertAndSend("/group/" + chat.getId(), savedMessage);

        return savedMessage;
    }

    @Override
    public List<Message> getMessagesByProjectId(Long projectId) throws Exception
    {
        Chat chat = projectService.getChatByProjectId(projectId);

        return messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
    }
}
