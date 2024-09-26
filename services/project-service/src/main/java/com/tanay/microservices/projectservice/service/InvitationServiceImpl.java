package com.tanay.microservices.projectservice.service;

import com.tanay.microservices.projectservice.dto.UserDTO;
import com.tanay.microservices.projectservice.model.Invitation;
import com.tanay.microservices.projectservice.repository.InvitationRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationServiceImpl implements InvitationService
{
    private final InvitationRepository invitationRepository;
    private final EmailService emailService;

    @Autowired
    public InvitationServiceImpl(InvitationRepository invitationRepository, EmailService emailService)
    {
        this.invitationRepository = invitationRepository;
        this.emailService = emailService;
    }

    @Override
    public void sendInvitation(String email, Long projectId, String baseUrl) throws MessagingException
    {
        String invitationToken = UUID.randomUUID().toString();

        Invitation invitation = new Invitation();
        invitation.setEmail(email);
        invitation.setProjectId(projectId);
        invitation.setToken(invitationToken);

        invitationRepository.save(invitation);

        String invitationLink = baseUrl + "/accept_invitation?token=" + invitationToken;
        emailService.sendEmailWithToken(email, invitationLink);
    }

    @Override
    public Invitation acceptInvitation(String token, UserDTO user) throws Exception
    {
        Invitation invitation = invitationRepository.findByToken(token);
        if(invitation == null)
            throw new Exception("Invalid Invitation Token");

        return invitation;
    }

    @Override
    public String getTokenByUserEmail(String userEmail)
    {
        Invitation invitation = invitationRepository.findByEmail(userEmail);

        return invitation.getToken();
    }

    @Override
    public void deleteToken(String token)
    {
        Invitation invitation = invitationRepository.findByToken(token);

        invitationRepository.delete(invitation);
    }
}