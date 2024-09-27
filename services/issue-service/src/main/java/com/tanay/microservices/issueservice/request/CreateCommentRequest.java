package com.tanay.microservices.issueservice.request;

import lombok.Data;

@Data
public class CreateCommentRequest
{
    private String content;

    private Long issueId;
}
