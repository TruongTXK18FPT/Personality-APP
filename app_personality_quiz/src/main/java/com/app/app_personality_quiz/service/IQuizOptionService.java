package com.app.app_personality_quiz.service;

import java.util.List;

import com.app.app_personality_quiz.dto.QuizOptionsDTO;
import com.app.app_personality_quiz.entity.QuizOptions;

public interface IQuizOptionService {
    List<QuizOptionsDTO> getOptionsByQuestionId(Long questionId);
    List<QuizOptionsDTO> getOptionsByQuestionIds(List<Long> questionIds);
    QuizOptionsDTO getOptionById(Long id);
    List<QuizOptionsDTO> getOptionsByTargetTrait(String targetTrait);
    List<QuizOptionsDTO> getOptionsByScoreValue(QuizOptions.ScoreValue scoreValue);
    List<QuizOptionsDTO> getOptionsGroupedByTargetTrait(Long questionId, String targetTrait);
        QuizOptionsDTO createOption(QuizOptionsDTO optionDTO);
    List<QuizOptionsDTO> createOptions(List<QuizOptionsDTO> optionDTOs);
    QuizOptionsDTO updateOption(Long id, QuizOptionsDTO optionDTO);
    void deleteOptionsByQuestionId(Long questionId);
    long countOptionsByQuestionId(Long questionId);
    boolean optionExists(Long id);
}
