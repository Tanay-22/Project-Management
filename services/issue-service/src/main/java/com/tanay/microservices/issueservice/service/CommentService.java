package com.tanay.microservices.issueservice.service;

import com.tanay.microservices.issueservice.dto.UserDTO;
import com.tanay.microservices.issueservice.model.Comment;

import java.util.List;

public interface CommentService
{
    Comment createComment(Long issueId, UserDTO user, String comment) throws Exception;

    void deleteComment(Long commentId, UserDTO user) throws Exception;

    List<Comment> findByIssueId(Long issueId);
}