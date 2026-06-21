package com.edu2job.controller;

import com.edu2job.dto.ProfileDto;
import com.edu2job.service.ProfileService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // Get profile of authenticated user
    @GetMapping
    public ResponseEntity<ProfileDto> getProfile(Principal principal) {
        ProfileDto profileDto = profileService.getProfile(principal.getName());
        return ResponseEntity.ok(profileDto);
    }

    // Update profile of authenticated user
    @PutMapping
    public ResponseEntity<ProfileDto> updateProfile(Principal principal, @Valid @RequestBody ProfileDto profileDto) {
        ProfileDto updatedProfile = profileService.updateProfile(principal.getName(), profileDto);
        return ResponseEntity.ok(updatedProfile);
    }
}
