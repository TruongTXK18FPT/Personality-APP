package com.app.app_personality_quiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.app.app_personality_quiz.dto.LoginRequestDTO;
import com.app.app_personality_quiz.dto.LoginResponseDTO;
import com.app.app_personality_quiz.dto.LogoutResponseDTO;
import com.app.app_personality_quiz.dto.RegisterRequestDTO;
import com.app.app_personality_quiz.dto.UserProfileDTO;
import com.app.app_personality_quiz.service.IAccountService;

@RestController
@RequestMapping("/api/auth")
public class AccountController {
    @Autowired
    private IAccountService accountMemberService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            LoginResponseDTO response = accountMemberService.authenticate(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LoginResponseDTO errorResponse = new LoginResponseDTO();
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO registerRequest) {
        try {
            accountMemberService.register(registerRequest);
            return ResponseEntity.ok("Registration successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            UserProfileDTO profile = accountMemberService.getUserProfile(email);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<LogoutResponseDTO> logout(Authentication authentication) {
        try {
            String email = authentication.getName();

            LogoutResponseDTO response = new LogoutResponseDTO();
            response.setMessage("Logout successful");
            response.setEmail(email);
            response.setSuccess(true);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LogoutResponseDTO errorResponse = new LogoutResponseDTO();
            errorResponse.setMessage("Logout failed");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}

