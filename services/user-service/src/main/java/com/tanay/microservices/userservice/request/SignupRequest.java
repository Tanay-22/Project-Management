package com.tanay.microservices.userservice.request;

import lombok.Data;

@Data
public class SignupRequest
{
    private String fullName;
    private String email;
    private String password;
}
