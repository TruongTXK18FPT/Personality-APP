package com.app.app_personality_quiz.controller;

import com.app.app_personality_quiz.dto.*;
import com.app.app_personality_quiz.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final IQuizService quizService;
    private final IQuizQuestionService quizQuestionService;
    private final IQuizOptionService quizOptionService;
    private final IQuizResultService quizResultService;

    // 1. Get all quizzes by category
    @GetMapping("/category/{categoryId}")
    public List<QuizDTO> getAllQuizByCategory(@PathVariable Long categoryId) {
        return quizService.getQuizByCategory(categoryId);
    }

    // 2. Get quizzes by type (DISC/MBTI)
    @GetMapping("/type/{type}")
    public List<QuizDTO> getQuizByType(@PathVariable String type) {
        // You may need to implement this in your service
        return quizService.getAllQuiz().stream()
                .filter(q -> q.getTitle().toUpperCase().contains(type.toUpperCase()))
                .toList();
    }

    // 3. Get questions by quiz ID
    @GetMapping("/{quizId}/questions")
    public List<QuizQuestionDTO> getQuestionsByQuizId(@PathVariable Long quizId) {
        return quizQuestionService.getQuestionsByQuizId(quizId);
    }

    // 4. Get options by question ID
    @GetMapping("/question/{questionId}/options")
    public List<QuizOptionsDTO> getOptionsByQuestionId(@PathVariable Long questionId) {
        return quizOptionService.getOptionsByQuestionId(questionId);
    }

    // 5. Take quiz (get quiz with questions and options)
    @GetMapping("/{quizId}/take")
    public QuizDTO takeQuiz(@PathVariable Long quizId) {
        return quizService.getQuizWithQuestions(quizId);
    }

    // 6. Submit quiz answers and show result
    @PostMapping("/submit")
    public QuizResultDTO submitQuiz(@RequestBody QuizResultDTO quizResultDTO, @RequestParam String userId) {
        return quizResultService.saveQuizResult(quizResultDTO, userId);
    }

    // 7. Get quiz result by result ID
    @GetMapping("/result/{resultId}")
    public QuizResultDTO getQuizResult(@PathVariable Long resultId) {
        return quizResultService.getResultById(resultId);
    }

    // 8. Get all results for current user
    @GetMapping("/my-results")
    public UserQuizResultsDTO getMyResults(@RequestParam String userId, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        return quizResultService.getMyQuizResults(userId, authorizationHeader);
    }
}