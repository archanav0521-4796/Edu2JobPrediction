package com.edu2job.repository;

import com.edu2job.entity.PredictionHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PredictionHistoryRepository extends JpaRepository<PredictionHistory, Long> {
    List<PredictionHistory> findByUserIdOrderByPredictionDateDesc(Long userId);
    List<PredictionHistory> findByUserIdAndTopJobRoleContainingIgnoreCaseOrderByPredictionDateDesc(Long userId, String query);
}
