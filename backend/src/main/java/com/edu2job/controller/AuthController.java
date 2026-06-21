package com.edu2job.controller;

import com.edu2job.dto.AuthResponse;
import com.edu2job.dto.LoginRequest;
import com.edu2job.dto.RegisterRequest;
import com.edu2job.dto.ResetPasswordRequest;
import com.edu2job.entity.User;
import com.edu2job.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register API
    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest registerRequest) {
        User user = authService.register(registerRequest);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    // Reset Password API
    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest resetRequest) {
        authService.resetPassword(resetRequest);
        return ResponseEntity.ok().build();
    }
}
