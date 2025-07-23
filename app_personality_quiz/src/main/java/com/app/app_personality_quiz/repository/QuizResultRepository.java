package com.app.app_personality_quiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.app_personality_quiz.entity.QuizResult;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUserId(String userId);
    
}
