package com.app.app_personality_quiz.dto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestionDTO {
    private Long id;

    private String content;

    private Integer orderNumber;
    private String dimension;

    @NotNull(message = "Quiz ID is required")
    private Long quizId;

    private List<QuizOptionsDTO> options;
}
