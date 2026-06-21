package com.edu2job.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PredictionResponse {
    private Long id;
    private LocalDateTime predictionDate;
    private String topJobRole;
    private Double confidenceScore;
    private List<CareerRecommendation> recommendations = new ArrayList<>();

    // Constructors
    public PredictionResponse() {}

    public PredictionResponse(Long id, LocalDateTime predictionDate, String topJobRole, Double confidenceScore, List<CareerRecommendation> recommendations) {
        this.id = id;
        this.predictionDate = predictionDate;
        this.topJobRole = topJobRole;
        this.confidenceScore = confidenceScore;
        this.recommendations = recommendations;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getPredictionDate() {
        return predictionDate;
    }

    public void setPredictionDate(LocalDateTime predictionDate) {
        this.predictionDate = predictionDate;
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

    public List<CareerRecommendation> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<CareerRecommendation> recommendations) {
        this.recommendations = recommendations;
    }
}
