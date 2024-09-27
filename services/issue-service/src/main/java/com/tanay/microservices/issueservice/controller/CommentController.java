package com.tanay.microservices.issueservice.controller;

import com.tanay.microservices.issueservice.config.JwtConstant;
import com.tanay.microservices.issueservice.dto.UserDTO;
import com.tanay.microservices.issueservice.model.Comment;
import com.tanay.microservices.issueservice.request.CreateCommentRequest;
import com.tanay.microservices.issueservice.response.MessageResponse;
import com.tanay.microservices.issueservice.service.CommentService;
import com.tanay.microservices.issueservice.service.UserServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController
{
    private final CommentService commentService;
    private final UserServiceClient userServiceClient;

    @Autowired
    public CommentController(CommentService commentService, UserServiceClient userServiceClient)
    {
        this.commentService = commentService;
        this.userServiceClient = userServiceClient;
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CreateCommentRequest req,
                                                 @RequestHeader(JwtConstant.JWT_HEADER) String jwt)
        throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);
        Comment createdComment = commentService.createComment(req.getIssueId(), user, req.getContent());

        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId,
                                                         @RequestHeader(JwtConstant.JWT_HEADER) String jwt)
        throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(jwt);
        commentService.deleteComment(commentId, user);

        MessageResponse res = new MessageResponse();
        res.setMessage("COMMENT DELETED SUCCESSFULLY");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>> getCommentsByIssueId(@PathVariable Long issueId)
    {
        List<Comment> comments = commentService.findByIssueId(issueId);

        return new ResponseEntity<>(comments, HttpStatus.OK);
    }
}
