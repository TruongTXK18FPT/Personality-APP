package com.app.app_personality_quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizDTO {
    private Long id;
    private String title;
    private Long categoryId;
    private String description;
    private Integer questionQuantity;
    private String categoryName;
    private List<QuizQuestionDTO> questions;
}
