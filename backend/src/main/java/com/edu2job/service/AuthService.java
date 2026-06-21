package com.edu2job.service;

import com.edu2job.dto.AuthResponse;
import com.edu2job.dto.LoginRequest;
import com.edu2job.dto.RegisterRequest;
import com.edu2job.dto.ResetPasswordRequest;
import com.edu2job.entity.Profile;
import com.edu2job.entity.User;
import com.edu2job.exception.DuplicateEmailException;
import com.edu2job.repository.ProfileRepository;
import com.edu2job.repository.UserRepository;
import com.edu2job.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Transactional
    public User register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new DuplicateEmailException("Email address is already in use.");
        }

        User user = new User(
                registerRequest.getFullName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword())
        );

        User savedUser = userRepository.save(user);

        // Auto-create an empty profile for the new user
        Profile profile = new Profile(savedUser);
        profileRepository.save(profile);

        return savedUser;
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest resetRequest) {
        User user = userRepository.findByEmail(resetRequest.getEmail())
                .orElseThrow(() -> new com.edu2job.exception.ResourceNotFoundException("User not found with email: " + resetRequest.getEmail()));



        user.setPassword(passwordEncoder.encode(resetRequest.getNewPassword()));
        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateToken(loginRequest.getEmail());
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

        return new AuthResponse(token, user.getEmail(), user.getFullName(), user.getId());
    }
}
