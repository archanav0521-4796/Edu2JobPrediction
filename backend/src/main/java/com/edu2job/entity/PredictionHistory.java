package com.edu2job.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "prediction_history")
public class PredictionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prediction_id", nullable = false)
    private Prediction prediction;

    @Column(name = "top_job_role", nullable = false, length = 100)
    private String topJobRole;

    @Column(name = "confidence_score", nullable = false)
    private Double confidenceScore;

    @CreationTimestamp
    @Column(name = "prediction_date", nullable = false, updatable = false)
    private LocalDateTime predictionDate;

    // Constructors
    public PredictionHistory() {}

    public PredictionHistory(User user, Prediction prediction, String topJobRole, Double confidenceScore) {
        this.user = user;
        this.prediction = prediction;
        this.topJobRole = topJobRole;
        this.confidenceScore = confidenceScore;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Prediction getPrediction() {
        return prediction;
    }

    public void setPrediction(Prediction prediction) {
        this.prediction = prediction;
    }

    public String getTopJobRole() {
        return topJobRole;
    }

    public void setTopJobRole(String topJobRole) {
        this.topJobRole = topJobRole;
    }

    public Double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(Double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public LocalDateTime getPredictionDate() {
        return predictionDate;
    }

    public void setPredictionDate(LocalDateTime predictionDate) {
        this.predictionDate = predictionDate;
    }
}
