package com.tanay.microservices.issueservice.controller;

import com.tanay.microservices.issueservice.config.JwtConstant;
import com.tanay.microservices.issueservice.dto.ProjectDTO;
import com.tanay.microservices.issueservice.dto.UserDTO;
import com.tanay.microservices.issueservice.model.Issue;
import com.tanay.microservices.issueservice.request.IssueRequest;
import com.tanay.microservices.issueservice.response.MessageResponse;
import com.tanay.microservices.issueservice.service.IssueService;
import com.tanay.microservices.issueservice.service.ProjectServiceClient;
import com.tanay.microservices.issueservice.service.UserServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController
{
    private final IssueService issueService;
    private final UserServiceClient userServiceClient;
    private final ProjectServiceClient projectServiceClient;

    @Autowired
    public IssueController(IssueService issueService, UserServiceClient userServiceClient, ProjectServiceClient projectServiceClient)
    {
        this.issueService = issueService;
        this.userServiceClient = userServiceClient;
        this.projectServiceClient = projectServiceClient;
    }


    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId) throws Exception
    {
        return ResponseEntity.ok(issueService.getIssueById(issueId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssueByProductId(@PathVariable Long projectId) throws Exception
    {
        return ResponseEntity.ok(issueService.getIssueByProjectId(projectId));
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestBody IssueRequest req,
                                                @RequestHeader(JwtConstant.JWT_HEADER) String token)
        throws Exception
    {
        UserDTO tokenUser = userServiceClient.getUserProfile(token);
        ProjectDTO project = projectServiceClient.getProjectById(req.getProjectId());
        Issue createdIssue = issueService.createIssue(req, tokenUser, project);
        Issue issue = new Issue();

        issue.setDescription(createdIssue.getDescription());
        issue.setDueDate(createdIssue.getDueDate());
        issue.setId(createdIssue.getId());
        issue.setPriority(createdIssue.getPriority());
        issue.setProjectId(createdIssue.getProjectId());
        issue.setStatus(createdIssue.getStatus());
        issue.setTitle(createdIssue.getTitle());
        issue.setTags(createdIssue.getTags());
        issue.setAssigneeId(createdIssue.getAssigneeId());

        return ResponseEntity.ok(issue);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssue(@PathVariable Long issueId,
                                                       @RequestHeader(JwtConstant.JWT_HEADER) String token)
        throws Exception
    {
        UserDTO user = userServiceClient.getUserProfile(token);
        issueService.deleteIssue(issueId, user);

        MessageResponse res = new MessageResponse();
        res.setMessage("Issue Deleted");

        return ResponseEntity.ok(res);
    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueId,
                                                @PathVariable Long userId)
        throws Exception
    {
        Issue issue = issueService.addUserToIssue(issueId, userId);

        return ResponseEntity.ok(issue);
    }

    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(@PathVariable Long issueId,
                                                @PathVariable String status)
            throws Exception
    {
        Issue issue = issueService.updateStatus(issueId, status);

        return ResponseEntity.ok(issue);
    }
}
