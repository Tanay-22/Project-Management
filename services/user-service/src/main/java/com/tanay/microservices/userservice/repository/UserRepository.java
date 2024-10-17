package com.tanay.microservices.userservice.repository;

import com.tanay.microservices.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>
{
    User findByEmail(String email);
}
