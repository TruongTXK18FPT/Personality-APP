package com.app.app_personality_quiz.repository;
import com.app.app_personality_quiz.dto.QuizDTO;
import com.app.app_personality_quiz.dto.QuizRequestDTO;
import com.app.app_personality_quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

List<QuizDTO> getAllQuiz();
    QuizDTO getQuizById(Long id);
    QuizDTO getQuizWithQuestions(Long id);
    List<QuizDTO> getQuizByCategory(Long categoryId);
    QuizDTO updateQuiz(Long id, QuizRequestDTO quizRequestDTO);}
