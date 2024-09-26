package com.tanay.microservices.projectservice.repository;

import com.tanay.microservices.projectservice.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long>
{
    List<Project> findByOwnerId(Long userId);

    List<Project> findByNameContainingAndTeamContains(String partialName, Long userId);

    @Query("select p from Project p where :userId member of p.team")
    List<Project> findProjectsByTeam(@Param("userId") Long userId);

    List<Project> findByTeamContainingOrOwnerId(Long userId, Long ownerId);
}