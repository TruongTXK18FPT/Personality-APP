package com.app.app_personality_quiz.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.app_personality_quiz.entity.AnalysisResult;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AnalysisResultRepository extends JpaRepository<AnalysisResult, UUID> {
    boolean existsBySessionId(String sessionId);

    void deleteBySessionId(String sessionId);
     //Tìm kết quả phân tích theo cả userId và sessionId để đảm bảo an toàn
    Optional<AnalysisResult> findByUserIdAndSessionId(String userId, String sessionId);
}
