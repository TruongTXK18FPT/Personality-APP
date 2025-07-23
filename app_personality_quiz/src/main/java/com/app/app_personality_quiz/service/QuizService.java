package com.app.app_personality_quiz.service;

import java.util.List;
import java.util.stream.Collectors;

import com.app.app_personality_quiz.dto.QuizDTO;
import com.app.app_personality_quiz.dto.QuizRequestDTO;
import com.app.app_personality_quiz.entity.Quiz;
import com.app.app_personality_quiz.exception.CategoryNotFoundException;
import com.app.app_personality_quiz.exception.QuizNotFoundException;
import com.app.app_personality_quiz.repository.CategoryRepository;
import com.app.app_personality_quiz.repository.QuizRepository;

import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizService implements IQuizService {

    private final QuizRepository quizRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<QuizDTO> getAllQuiz() {
        List<Quiz> quizzes = quizRepository.findAll();
        return quizzes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public QuizDTO getQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new QuizNotFoundException("Quiz not found with id: " + id));
        return convertToDTO(quiz);
    }

    @Transactional(readOnly = true)
    public QuizDTO getQuizWithQuestions(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new QuizNotFoundException("Quiz not found with id: " + id));
        QuizDTO quizDTO = convertToDTO(quiz);
        return quizDTO;
    }

    @Transactional(readOnly = true)
    public List<QuizDTO> getQuizByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new CategoryNotFoundException(categoryId);
        }
        List<Quiz> quizzes = quizRepository.findByCategoryId(categoryId);
        return quizzes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private QuizDTO convertToDTO(Quiz quiz) {
        return QuizDTO.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .categoryId(quiz.getCategory().getId())
                .categoryName(quiz.getCategory().getName())
                .description(quiz.getDescription())
                .questionQuantity(quiz.getQuestionQuantity())
                .build();
    }
}
