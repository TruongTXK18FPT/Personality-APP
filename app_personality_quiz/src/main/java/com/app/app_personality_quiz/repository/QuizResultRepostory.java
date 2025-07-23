package com.app.app_personality_quiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.app_personality_quiz.entity.QuizResult;

public interface QuizResultRepostory extends JpaRepository<QuizResult, Long> {
    
    // Custom query methods can be added here if needed
    // For example, to find results by user email or quiz type
    List<QuizResult> findByAccountEmail(String email);
    
    List<QuizResult> findByQuizType(String quizType);

    
}
