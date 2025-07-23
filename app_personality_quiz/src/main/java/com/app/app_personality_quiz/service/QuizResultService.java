package com.app.app_personality_quiz.service;

import com.app.app_personality_quiz.dto.PersonalityResultDTO;
import com.app.app_personality_quiz.dto.QuizResultDTO;
import com.app.app_personality_quiz.dto.QuizSubmissionDTO;
import com.app.app_personality_quiz.dto.UserQuizResultsDTO;
import com.app.app_personality_quiz.entity.PersonalityStandard;
import com.app.app_personality_quiz.entity.QuizResult;
import com.app.app_personality_quiz.exception.QuizNotFoundException;
import com.app.app_personality_quiz.repository.PersonalityStandardRepository;
import com.app.app_personality_quiz.repository.QuizResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class QuizResultService implements IQuizResultService {

    private final QuizResultRepository quizResultRepository;
    private final PersonalityStandardRepository personalityStandardRepository;
    private final PersonalityCalculationService personalityCalculationService;
    private final ObjectMapper objectMapper;
// ...existing code...

    @Override
    public QuizResultDTO saveQuizResult(QuizResultDTO quizResultDTO, String userId) {
        try {
            // Parse resultJson to QuizSubmissionDTO
            QuizSubmissionDTO submission = objectMapper.readValue(quizResultDTO.getResultJson(), QuizSubmissionDTO.class);

            // Calculate personality result
            PersonalityResultDTO personalityResult = personalityCalculationService.calculatePersonality(submission);

            // Find PersonalityStandard by code
            PersonalityStandard personalityStandard = personalityStandardRepository
                    .findByPersonalityCode(personalityResult.getPersonalityCode())
                    .orElse(null);

            // Build QuizResult entity
            QuizResult quizResult = new QuizResult();
            quizResult.setResultType(personalityStandard != null ? personalityStandard.getStandard().name() : "UNKNOWN");
            quizResult.setTimeSubmit(LocalDateTime.now());
            quizResult.setAttemptOrder(quizResultDTO.getAttemptOrder());
            quizResult.setResultJson(objectMapper.writeValueAsString(personalityResult));
            quizResult.setQuizId(submission.getQuizId());
            quizResult.setUserId(Long.valueOf(userId));
            quizResult.setPersonalityId(personalityStandard != null ? personalityStandard.getId() : null);

            QuizResult saved = quizResultRepository.save(quizResult);

            // Build DTO to return
            QuizResultDTO resultDTO = new QuizResultDTO();
            resultDTO.setId(saved.getId());
            resultDTO.setResultType(saved.getResultType());
            resultDTO.setTimeSubmit(saved.getTimeSubmit());
            resultDTO.setAttemptOrder(saved.getAttemptOrder());
            resultDTO.setResultJson(saved.getResultJson());
            resultDTO.setQuizId(saved.getQuizId());
            resultDTO.setUserId(userId);
            resultDTO.setPersonalityId(saved.getPersonalityId());
            return resultDTO;
        } catch (Exception e) {
            log.error("Error saving quiz result", e);
            throw new RuntimeException("Failed to save quiz result");
        }
    }

    @Override
    public UserQuizResultsDTO getMyQuizResults(String userId, String authorizationHeader) {
        List<QuizResult> results = quizResultRepository.findByAccountId(Long.valueOf(userId));
        if (results.isEmpty()) {
            return UserQuizResultsDTO.builder()
                    .userId(userId)
                    .totalQuizzesTaken(0)
                    .quizResults(List.of())
                    .build();
        }

        List<UserQuizResultsDTO.QuizResultSummaryDTO> summaries = results.stream().map(result -> {
            PersonalityStandard personalityStandard = result.getPersonalityStandard();
            return UserQuizResultsDTO.QuizResultSummaryDTO.builder()
                    .resultId(result.getId())
                    .quizId(result.getQuizId())
                    .quizTitle(result.getQuiz() != null ? result.getQuiz().getTitle() : null)
                    .resultType(result.getResultType())
                    .personalityCode(personalityStandard != null ? personalityStandard.getPersonalityCode() : null)
                    .personalityName(personalityStandard != null ? personalityStandard.getNickname() : null)
                    .personalityDescription(personalityStandard != null ? personalityStandard.getDescription() : null)
                    .attemptOrder(result.getAttemptOrder())
                    .timeSubmit(result.getTimeSubmit())
                    .resultJson(result.getResultJson())
                    .build();
        }).collect(Collectors.toList());

        LocalDateTime firstQuizDate = results.stream()
                .map(QuizResult::getTimeSubmit)
                .min(LocalDateTime::compareTo)
                .orElse(null);

        LocalDateTime lastQuizDate = results.stream()
                .map(QuizResult::getTimeSubmit)
                .max(LocalDateTime::compareTo)
                .orElse(null);

        return UserQuizResultsDTO.builder()
                .userId(userId)
                .totalQuizzesTaken(results.size())
                .firstQuizDate(firstQuizDate)
                .lastQuizDate(lastQuizDate)
                .quizResults(summaries)
                .build();
    }

    @Override
    public QuizResultDTO getResultById(Long resultId) {
        QuizResult result = quizResultRepository.findById(resultId)
                .orElseThrow(() -> new QuizNotFoundException("Quiz result not found with id: " + resultId));
        QuizResultDTO dto = new QuizResultDTO();
        dto.setId(result.getId());
        dto.setResultType(result.getResultType());
        dto.setTimeSubmit(result.getTimeSubmit());
        dto.setAttemptOrder(result.getAttemptOrder());
        dto.setResultJson(result.getResultJson());
        dto.setQuizId(result.getQuizId());
        dto.setUserId(result.getUserId() != null ? result.getUserId().toString() : null);
        dto.setPersonalityId(result.getPersonalityId());
        return dto;
    }
    
}