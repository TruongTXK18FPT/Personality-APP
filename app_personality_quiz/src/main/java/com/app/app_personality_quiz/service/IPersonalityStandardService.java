package com.app.app_personality_quiz.service;


import com.app.app_personality_quiz.dto.PersonalityStandardDTO;
import com.app.app_personality_quiz.entity.PersonalityStandard;

import java.util.List;

public interface IPersonalityStandardService {
    List<PersonalityStandardDTO> getAllPersonalityStandards();

    PersonalityStandardDTO getPersonalityStandardById(Long id);

    List<PersonalityStandardDTO> getByStandard(PersonalityStandard.StandardType standard);

    PersonalityStandardDTO getByPersonalityCode(String personalityCode);

    PersonalityStandardDTO updatePersonalityStandard(Long id, PersonalityStandardDTO dto);
}
