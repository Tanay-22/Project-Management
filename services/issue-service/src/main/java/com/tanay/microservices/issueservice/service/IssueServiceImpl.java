package com.tanay.microservices.issueservice.service;

import com.tanay.microservices.issueservice.dto.ProjectDTO;
import com.tanay.microservices.issueservice.dto.UserDTO;
import com.tanay.microservices.issueservice.model.Issue;
import com.tanay.microservices.issueservice.repository.IssueRepository;
import com.tanay.microservices.issueservice.request.IssueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl implements IssueService
{
    private final IssueRepository issueRepository;

    @Autowired
    public IssueServiceImpl(IssueRepository issueRepository)
    {
        this.issueRepository = issueRepository;
    }

    @Override
    public Issue getIssueById(Long issueId) throws Exception
    {
        Optional<Issue> issue = issueRepository.findById(issueId);
        if(issue.isPresent())
            return issue.get();
        throw new Exception("No issues found with issue id - " + issueId);
    }

    @Override
    public List<Issue> getIssueByProjectId(Long projectId) throws Exception
    {
        return issueRepository.findByProjectId(projectId);
    }

    @Override
    public Issue createIssue(IssueRequest req, UserDTO user, ProjectDTO project) throws Exception
    {
        Issue issue = new Issue();
        issue.setTitle(req.getTitle());
        issue.setDescription(req.getDescription());
        issue.setStatus(req.getStatus());
        issue.setPriority(req.getPriority());
        issue.setDueDate(req.getDueDate());
        issue.setProjectId(project.getId());

        return issueRepository.save(issue);
    }

    @Override
    public void deleteIssue(Long issueId, UserDTO user) throws Exception
    {
        issueRepository.deleteById(issueId);
    }

    @Override
    public Issue addUserToIssue(Long issueId, Long userId) throws Exception
    {
        Issue issue = getIssueById(issueId);
        issue.setAssigneeId(userId);

        return issueRepository.save(issue);
    }

    @Override
    public Issue updateStatus(Long issueId, String status) throws Exception
    {
        Issue issue = getIssueById(issueId);
        issue.setStatus(status);

        return issueRepository.save(issue);
    }
}
