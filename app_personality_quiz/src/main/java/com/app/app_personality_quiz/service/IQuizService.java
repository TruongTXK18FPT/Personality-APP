package com.app.app_personality_quiz.service;

import java.util.List;

import com.app.app_personality_quiz.dto.QuizDTO;

public interface IQuizService {
    List<QuizDTO> getAllQuiz();
    QuizDTO getQuizById(Long id);
    QuizDTO getQuizWithQuestions(Long id);
    List<QuizDTO> getQuizByCategory(Long categoryId);
}
