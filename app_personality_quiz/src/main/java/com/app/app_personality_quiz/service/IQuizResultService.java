package com.app.app_personality_quiz.service;

import com.app.app_personality_quiz.dto.QuizResultDTO;
import com.app.app_personality_quiz.dto.UserQuizResultsDTO;

public interface IQuizResultService {
    UserQuizResultsDTO getMyQuizResults(String userId, String authorizationHeader);
    QuizResultDTO getResultById(Long resultId);
    QuizResultDTO saveQuizResult(QuizResultDTO quizResultDTO, String userId);

}
