package com.tanay.microservices.projectservice.service;

import com.tanay.microservices.projectservice.dto.UserDTO;
import com.tanay.microservices.projectservice.model.Invitation;
import jakarta.mail.MessagingException;

public interface InvitationService
{
    void sendInvitation(String email, Long projectId, String baseUrl) throws MessagingException;

    Invitation acceptInvitation(String token, UserDTO user) throws Exception;

    String getTokenByUserEmail(String userEmail);

    void deleteToken(String token);
}