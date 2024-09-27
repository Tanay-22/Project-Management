package com.tanay.microservices.userservice.service;

import com.tanay.microservices.userservice.config.JwtProvider;
import com.tanay.microservices.userservice.model.User;
import com.tanay.microservices.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService
{
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception
    {
        String email = JwtProvider.getEmailFromToken(jwt);

        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception
    {
        User user = userRepository.findByEmail(email);
        if(user == null)
            throw new Exception("User not found");

        return user;
    }

    @Override
    public User findUserById(Long userId) throws Exception
    {
        Optional<User> opt = userRepository.findById(userId);
        if(opt.isEmpty())
            throw new Exception("User Not Found");

        return opt.get();
    }

    @Override
    public User updateUsersProjectSize(User user, int number)
    {
        user.setProjectSize(user.getProjectSize() + number);

        return userRepository.save(user);
    }
}
