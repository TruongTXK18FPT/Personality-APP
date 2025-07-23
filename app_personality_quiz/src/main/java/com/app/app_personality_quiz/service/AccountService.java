package com.app.app_personality_quiz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.app.app_personality_quiz.dto.LoginRequestDTO;
import com.app.app_personality_quiz.dto.LoginResponseDTO;
import com.app.app_personality_quiz.dto.RegisterRequestDTO;
import com.app.app_personality_quiz.dto.UserProfileDTO;
import com.app.app_personality_quiz.entity.Account;
import com.app.app_personality_quiz.repository.AccountRepository;
import com.app.app_personality_quiz.config.JwtUtil;



import java.util.Optional;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private AccountRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public LoginResponseDTO authenticate(LoginRequestDTO loginRequest) {
        Optional<Account> account = repository.findByEmail (loginRequest.getEmail());

        if (account.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), account.get().getPassword())) {
            // Check if user is Member (role = 3) and deny access


            String token = jwtUtil.generateToken(loginRequest.getEmail());

            LoginResponseDTO response = new LoginResponseDTO();
            response.setToken(token);
            response.setMessage("Login successful");
            response.setUserProfile(convertToUserProfileDTO(account.get()));

            return response;
        }

        throw new RuntimeException("Invalid credentials or account inactive");
    }
    @Override
    public RegisterRequestDTO register(RegisterRequestDTO registerRequest) {
        if (repository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Account account = new Account();
        account.setFullName(registerRequest.getFullName());
        account.setEmail(registerRequest.getEmail());
        account.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        //role is set to 2 (Student) by default
        account.setRole(2); // Default role for new users

        repository.save(account);

        return registerRequest;
    }
    @Override
    public boolean logout(String email) {
        // In a stateless JWT-based authentication system, logout is typically handled on the client side.
        // Here we can just return true to indicate a successful logout operation.
        return true;
    }
    @Override
    public UserProfileDTO getUserProfile(String email) {
        Account account = findByEmail(email);
        return convertToUserProfileDTO(account);
    }
    @Override
    public Account findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    private UserProfileDTO convertToUserProfileDTO(Account account) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setEmail(account.getEmail());
        dto.setFullName(account.getFullName());
        dto.setRole(account.getRole());
        return dto;
    }
}

