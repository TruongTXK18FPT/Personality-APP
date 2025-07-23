package com.app.app_personality_quiz.service;

import com.app.app_personality_quiz.dto.AnalysisResultDTO;

public interface IAnalysisService {
    AnalysisResultDTO analyzeConversation(String userId, String sessionId);
}
