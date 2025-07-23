package com.app.app_personality_quiz.service;

import java.util.List;

import com.app.app_personality_quiz.dto.QuizQuestionDTO;

public interface IQuizQuestionService {
    List<QuizQuestionDTO> getQuestionsByQuizId(Long quizId);
    QuizQuestionDTO getQuestionById(Long id);
    List<QuizQuestionDTO> getQuestionsByDimension(String dimension);
}
