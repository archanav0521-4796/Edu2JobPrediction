package com.edu2job.repository;

import com.edu2job.entity.Prediction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, Long> {
    List<Prediction> findByUserIdOrderByPredictionDateDesc(Long userId);
}
