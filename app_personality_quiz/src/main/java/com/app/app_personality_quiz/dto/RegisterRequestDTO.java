package com.app.app_personality_quiz.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String fullName;
    private String email;
    private String password;
    private String confirmPassword;
}
