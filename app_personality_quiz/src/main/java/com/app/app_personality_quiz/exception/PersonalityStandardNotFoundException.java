package com.app.app_personality_quiz.exception;

public class PersonalityStandardNotFoundException extends RuntimeException {

    public PersonalityStandardNotFoundException(Long id) {
        super("Personality standard not found with id: " + id);
    }

    // Remove this constructor to avoid conflict:
    // public PersonalityStandardNotFoundException(String personalityCode)

    public static PersonalityStandardNotFoundException forCode(String personalityCode) {
        return new PersonalityStandardNotFoundException("Personality standard not found with code: " + personalityCode);
    }

    public PersonalityStandardNotFoundException(String message) {
        super(message);
    }
}

