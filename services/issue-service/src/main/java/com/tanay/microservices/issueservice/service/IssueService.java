package com.tanay.microservices.issueservice.service;

import com.tanay.microservices.issueservice.dto.ProjectDTO;
import com.tanay.microservices.issueservice.dto.UserDTO;
import com.tanay.microservices.issueservice.model.Issue;
import com.tanay.microservices.issueservice.request.IssueRequest;

import java.util.List;

public interface IssueService
{
    Issue getIssueById(Long issueId) throws Exception;

    List<Issue> getIssueByProjectId(Long projectId) throws Exception;

    Issue createIssue(IssueRequest req, UserDTO user, ProjectDTO project) throws Exception;

    void deleteIssue(Long issueId, UserDTO user) throws Exception;

    Issue addUserToIssue(Long issueId, Long userId) throws Exception;

    Issue updateStatus(Long issueId, String status) throws Exception;
}
