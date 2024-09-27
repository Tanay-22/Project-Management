package com.tanay.microservices.issueservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO
{
    private Long id;
    private String fullName;
    private String email;
    private String password;
}
