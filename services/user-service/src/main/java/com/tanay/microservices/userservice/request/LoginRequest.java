package com.tanay.microservices.userservice.request;

import lombok.Data;

@Data
public class LoginRequest
{
    private String email;
    private String password;
}