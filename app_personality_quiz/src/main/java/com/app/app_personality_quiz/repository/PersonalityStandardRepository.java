package com.app.app_personality_quiz.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.app_personality_quiz.entity.PersonalityStandard;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonalityStandardRepository extends JpaRepository<PersonalityStandard, Long> {

    Optional<PersonalityStandard> findByPersonalityCode(String personalityCode);

    List<PersonalityStandard> findByStandardOrderByPersonalityCode(PersonalityStandard.StandardType standard);
}
