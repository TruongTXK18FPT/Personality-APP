package com.app.app_personality_quiz.service;
import com.app.app_personality_quiz.dto.LoginRequestDTO;
import com.app.app_personality_quiz.dto.LoginResponseDTO;
import com.app.app_personality_quiz.dto.RegisterRequestDTO;
import com.app.app_personality_quiz.dto.UserProfileDTO;
import com.app.app_personality_quiz.entity.Account;
public interface IAccountService {
    Account findByEmail(String email);
    LoginResponseDTO authenticate(LoginRequestDTO loginRequestDTO);
    RegisterRequestDTO register(RegisterRequestDTO registerRequestDTO);
    boolean logout(String email);
    UserProfileDTO getUserProfile(String email);
}

