package com.tanay.microservices.userservice.controller;

import com.tanay.microservices.userservice.config.JwtProvider;
import com.tanay.microservices.userservice.model.User;
import com.tanay.microservices.userservice.repository.UserRepository;
import com.tanay.microservices.userservice.request.LoginRequest;
import com.tanay.microservices.userservice.request.SubscriptionRequest;
import com.tanay.microservices.userservice.response.AuthResponse;
import com.tanay.microservices.userservice.request.SignupRequest;
import com.tanay.microservices.userservice.service.CustomUserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/auth")
public class AuthController
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsImpl customUserDetails;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception
    {
        User isUserExist = userRepository.findByEmail(req.getEmail());

        if(isUserExist != null)
            throw new Exception("Email already linked with another account");

        User createdUser = new User();
        createdUser.setPassword(passwordEncoder.encode(req.getPassword()));
        createdUser.setEmail(req.getEmail());
        createdUser.setFullName(req.getFullName());

        User savedUser = userRepository.save(createdUser);

//        createSubscription(savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse();
        res.setMessage("SignUp success");
        res.setJwt(jwt);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest)
    {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse();
        res.setMessage("SignIn success");
        res.setJwt(jwt);

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    private Authentication authenticate(String username, String password)
    {
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);
        if(userDetails == null)
            throw new BadCredentialsException("Invalid Username");

        if(!passwordEncoder.matches(password, userDetails.getPassword()))
            throw new BadCredentialsException("Invalid Password");

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    private void createSubscription(User user) throws Exception
    {
        SubscriptionRequest req = new SubscriptionRequest();
        req.setUserId(user.getId());

        String url = "<subscription-service>";
        ResponseEntity<String> res = restTemplate.postForEntity(url, req, String.class);

        if(res.getStatusCode() != HttpStatus.CREATED)
        {
            throw new Exception("Subscription not created");
        }
    }
}