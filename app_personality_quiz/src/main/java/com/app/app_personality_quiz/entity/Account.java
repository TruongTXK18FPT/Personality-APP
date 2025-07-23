package com.app.app_personality_quiz.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "accounts")   
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false, unique = true)
    private String id;
    @Column(nullable = false, unique = true)
    private String fullName;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password; 
    @Column(nullable = false)
    private Integer role = 2; // 1: Admin,2:Student, 3: Parent
    @OneToMany(mappedBy = "account",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<QuizResult> quizResults;
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ChatMessage> chatMessages;
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AnalysisResult> analysisResults;
}
