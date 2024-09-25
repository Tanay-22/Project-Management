package com.tanay.projectmanagementsystem.controller;

import com.tanay.projectmanagementsystem.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeChat
{
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    public Message recieveMessage(@Payload Message message)
    {
        simpMessagingTemplate.convertAndSend("/group/" + message.getChat().getId(), message);

        return message;
    }
}
