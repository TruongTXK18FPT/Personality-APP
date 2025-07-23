package com.app.app_personality_quiz.exception;

public class InvalidQuizSubmissionException extends RuntimeException {
    public InvalidQuizSubmissionException(String message) {
        super(message);
    }

    public InvalidQuizSubmissionException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
