package com.tanay.microservices.userservice.repository;

import com.tanay.microservices.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>
{
    User findByEmail(String email);
}
