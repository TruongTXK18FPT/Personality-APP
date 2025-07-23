package com.app.app_personality_quiz.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.app_personality_quiz.entity.QuizOptions;

import java.util.List;

@Repository
public interface QuizOptionsRepository extends JpaRepository<QuizOptions, Long> {

    List<QuizOptions> findByQuestionId(Long questionId);
    List<QuizOptions> findByQuestionIdIn(List<Long> questionIds);
    List<QuizOptions> findByTargetTrait(String targetTrait);
    List<QuizOptions> findByScoreValue(QuizOptions.ScoreValue scoreValue);
    List<QuizOptions> findByQuestionIdAndTargetTrait(Long questionId, String targetTrait);
    long countByQuestionId(Long questionId);
    void deleteByQuestionId(Long questionId);

}
