package com.app.app_personality_quiz.dto;

import com.app.app_personality_quiz.entity.QuizOptions;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizOptionsDTO {
    private Long id;

    @NotBlank(message = "Option text is required")
    private String optionText;

    private String targetTrait;

    @NotNull(message = "Score value is required")
    private QuizOptions.ScoreValue scoreValue;

    @NotNull(message = "Question ID is required")
    private Long questionId;
}
