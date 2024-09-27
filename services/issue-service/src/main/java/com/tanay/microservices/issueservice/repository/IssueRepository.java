package com.tanay.microservices.issueservice.repository;

import com.tanay.microservices.issueservice.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long>
{
    List<Issue> findByProjectId(Long projectId);
}