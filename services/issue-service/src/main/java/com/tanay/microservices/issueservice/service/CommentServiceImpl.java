package com.tanay.microservices.issueservice.service;

import com.tanay.microservices.issueservice.dto.UserDTO;
import com.tanay.microservices.issueservice.model.Comment;
import com.tanay.microservices.issueservice.model.Issue;
import com.tanay.microservices.issueservice.repository.CommentRepository;
import com.tanay.microservices.issueservice.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class CommentServiceImpl implements CommentService
{
    private final CommentRepository commentRepository;
    private final IssueRepository issueRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, IssueRepository issueRepository)
    {
        this.commentRepository = commentRepository;
        this.issueRepository = issueRepository;
    }

    @Override
    public Comment createComment(Long issueId, UserDTO user, String comment) throws Exception
    {
        Optional<Issue> issueOptional = issueRepository.findById(issueId);

        if(issueOptional.isEmpty())
            throw new Exception("ISSUE NOT FOUND WITH ID - " + issueId);

        Issue issue = issueOptional.get();

        Comment newComment = new Comment();
        newComment.setUserId(user.getId());
        newComment.setIssue(issue);
        newComment.setCreatedAt(LocalDateTime.now());
        newComment.setContent(comment);

        Comment savedComment = commentRepository.save(newComment);
        issue.getComments().add(savedComment);

        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, UserDTO user) throws Exception
    {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);

        if(commentOptional.isEmpty())
            throw new Exception("COMMENT NOT FOUND WITH ID - " + commentId);

        Comment comment = commentOptional.get();

        if(comment.getUserId().equals(user.getId()))
            commentRepository.delete(comment);
        else
            throw new Exception("USER DOES NOT HAVE PERMISSION TO DELETE THIS COMMENT");
    }

    @Override
    public List<Comment> findByIssueId(Long issueId)
    {
        return commentRepository.findCommentsByIssueId(issueId);
    }
}
