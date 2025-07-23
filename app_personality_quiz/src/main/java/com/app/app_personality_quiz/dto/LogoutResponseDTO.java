package com.app.app_personality_quiz.dto;

import lombok.Data;

@Data
public class LogoutResponseDTO {
    private String message;
    private boolean success;
    private String email;
}
