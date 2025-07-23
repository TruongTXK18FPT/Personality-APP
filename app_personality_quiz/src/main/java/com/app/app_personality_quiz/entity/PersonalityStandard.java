package com.app.app_personality_quiz.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "personality_standard")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalityStandard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StandardType standard;

    @Column(name = "personality_code", nullable = false)
    private String personalityCode;

    private String nickname;

    @Column(name = "key_traits", columnDefinition = "TEXT")
    private String keyTraits;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "career_mapping_personality", columnDefinition = "TEXT")
    private String careerMappingPersonality;

    public enum StandardType {
        DISC, MBTI
    }
}
