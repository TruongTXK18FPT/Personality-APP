package com.app.app_personality_quiz.service;

import java.util.List;

import com.app.app_personality_quiz.dto.ChatRequestDTO;
import com.app.app_personality_quiz.dto.ChatResponseDTO;
import com.app.app_personality_quiz.entity.ChatMessage;

public interface IChatService {
    String createNewSession(String userId);

    ChatResponseDTO processMessage(String userId, ChatRequestDTO request);

    List<ChatMessage> getChatHistory(String userId, String sessionId);

    List<ChatMessage> getChatHistory(String sessionId);

    List<String> getSessionIdsForUser(String userId);

    void deleteSession(String userId, String sessionId); 
}
