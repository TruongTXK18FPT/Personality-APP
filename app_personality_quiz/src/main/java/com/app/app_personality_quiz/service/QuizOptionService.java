package com.app.app_personality_quiz.service;

import java.util.List;
import java.util.stream.Collectors;

import com.app.app_personality_quiz.dto.QuizOptionsDTO;
import com.app.app_personality_quiz.entity.QuizOptions;
import com.app.app_personality_quiz.entity.QuizQuestion;
import com.app.app_personality_quiz.exception.InvalidQuizSubmissionException;
import com.app.app_personality_quiz.exception.QuizNotFoundException;
import com.app.app_personality_quiz.repository.QuizOptionsRepository;
import com.app.app_personality_quiz.repository.QuizQuestionRepository;

import jakarta.persistence.Cacheable;
import jakarta.transaction.Transactional;

public class QuizOptionService implements IQuizOptionService {
    private final QuizOptionsRepository quizOptionsRepository;
    private final QuizQuestionRepository quizQuestionRepository;

    @Transactional
    public List<QuizOptionsDTO> getOptionsByQuestionId(Long questionId) {

        long startTime = System.currentTimeMillis();

        if (!quizQuestionRepository.existsById(questionId)) {
            throw new RuntimeException("Quiz question not found with id: " + questionId);
        }

        List<QuizOptions> options = quizOptionsRepository.findByQuestionId(questionId);
        List<QuizOptionsDTO> result = options.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        long endTime = System.currentTimeMillis();
        log.info("Fetched {} options for question {} in {} ms", result.size(), questionId, (endTime - startTime));

        return result;
    }

    @Transactional
    public List<QuizOptionsDTO> getOptionsByQuestionIds(List<Long> questionIds) {

        if (questionIds == null || questionIds.isEmpty()) {
            return List.of();
        }

        List<QuizQuestion> questions = quizQuestionRepository.findAllById(questionIds);
        if (questions.size() != questionIds.size()) {
            throw new RuntimeException("One or more quiz questions not found");
        }

        List<QuizOptions> options = quizOptionsRepository.findByQuestionIdIn(questionIds);
        return options.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<QuizOptionsDTO> getOptionsByTargetTrait(String targetTrait) {

        if (targetTrait == null || targetTrait.trim().isEmpty()) {
            throw new RuntimeException("Target trait cannot be empty");
        }

        List<QuizOptions> options = quizOptionsRepository.findByTargetTrait(targetTrait);
        return options.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<QuizOptionsDTO> getOptionsByScoreValue(QuizOptions.ScoreValue scoreValue) {

        if (scoreValue == null) {
            throw new RuntimeException("Score value cannot be null");
        }

        List<QuizOptions> options = quizOptionsRepository.findByScoreValue(scoreValue);
        return options.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    @Transactional
    public List<QuizOptionsDTO> getOptionsGroupedByTargetTrait(Long questionId, String targetTrait) {

        if (!quizQuestionRepository.existsById(questionId)) {
            throw new QuizNotFoundException("Quiz question not found with id: " + questionId);
        }

        if (targetTrait == null || targetTrait.trim().isEmpty()) {
            throw new InvalidQuizSubmissionException("Target trait cannot be empty");
        }

        List<QuizOptions> options = quizOptionsRepository.findByQuestionIdAndTargetTrait(questionId, targetTrait);
        return options.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private void validateOptionDTO(QuizOptionsDTO optionDTO) {
        if (optionDTO == null) {
            throw new RuntimeException("Option data cannot be null");
        }

        if (optionDTO.getOptionText() == null || optionDTO.getOptionText().trim().isEmpty()) {
            throw new RuntimeException("Option text cannot be empty");
        }

        if (optionDTO.getOptionText().length() > 1000) {
            throw new RuntimeException("Option text cannot exceed 1000 characters");
        }

        if (optionDTO.getTargetTrait() == null || optionDTO.getTargetTrait().trim().isEmpty()) {
            throw new RuntimeException("Target trait cannot be empty");
        }

        if (optionDTO.getTargetTrait().length() > 50) {
            throw new RuntimeException("Target trait cannot exceed 50 characters");
        }

        if (optionDTO.getScoreValue() == null) {
            throw new RuntimeException("Score value cannot be null");
        }

        if (optionDTO.getQuestionId() == null) {
            throw new RuntimeException("Question ID cannot be null");
        }
    }
    @Transactional
    public QuizOptionsDTO getOptionById(Long id) {

        QuizOptions option = quizOptionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz option not found with id: " + id));

        return convertToDTO(option);
    }
        private QuizOptionsDTO convertToDTO(QuizOptions option) {
        QuizOptionsDTO dto = new QuizOptionsDTO();
        dto.setId(option.getId());
        dto.setOptionText(option.getOptionText());
        dto.setTargetTrait(option.getTargetTrait());
        dto.setScoreValue(option.getScoreValue());
        dto.setQuestionId(option.getQuestionId());
        return dto;
    }

    private QuizOptions convertToEntity(QuizOptionsDTO dto) {
        QuizOptions option = new QuizOptions();
        option.setId(dto.getId());
        option.setOptionText(dto.getOptionText().trim());
        option.setTargetTrait(dto.getTargetTrait().trim());
        option.setScoreValue(dto.getScoreValue());
        option.setQuestionId(dto.getQuestionId());
        return option;
    }

}
