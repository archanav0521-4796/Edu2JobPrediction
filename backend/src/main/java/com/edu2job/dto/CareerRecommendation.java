package com.edu2job.dto;

public class CareerRecommendation {
    private String jobRole;
    private Double confidencePercentage;
    private String explanation;
    private boolean isHighest;

    // Constructors
    public CareerRecommendation() {}

    public CareerRecommendation(String jobRole, Double confidencePercentage, String explanation, boolean isHighest) {
        this.jobRole = jobRole;
        this.confidencePercentage = confidencePercentage;
        this.explanation = explanation;
        this.isHighest = isHighest;
    }

    // Getters and Setters
    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public Double getConfidencePercentage() {
        return confidencePercentage;
    }

    public void setConfidencePercentage(Double confidencePercentage) {
        this.confidencePercentage = confidencePercentage;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public boolean isHighest() {
        return isHighest;
    }

    public void setHighest(boolean highest) {
        isHighest = highest;
    }
}
