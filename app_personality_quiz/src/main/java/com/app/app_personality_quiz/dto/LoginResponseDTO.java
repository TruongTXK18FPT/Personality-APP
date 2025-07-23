package com.app.app_personality_quiz.dto;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String token;
    private String message;
    private UserProfileDTO userProfile;
}
