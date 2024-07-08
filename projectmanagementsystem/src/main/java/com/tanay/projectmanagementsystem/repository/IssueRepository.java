package com.tanay.projectmanagementsystem.repository;

import com.tanay.projectmanagementsystem.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long>
{
    List<Issue> findByProjectId(Long id);
}
