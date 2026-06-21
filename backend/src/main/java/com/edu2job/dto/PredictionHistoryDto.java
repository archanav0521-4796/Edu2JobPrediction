package com.edu2job.dto;

import java.time.LocalDateTime;

public class PredictionHistoryDto {
    private Long id;
    private Long predictionId;
    private LocalDateTime predictionDate;
    private String topJobRole;
    private Double confidenceScore;

    // Expanded fields for detailed list and analysis
    private String degree;
    private String major;
    private Double cgpa;
    private Integer yearsOfExperience;
    private String certificationsList;
    private String industryPreference;
    private String skillsList;

    // Constructors
    public PredictionHistoryDto() {}

    public PredictionHistoryDto(Long id, Long predictionId, LocalDateTime predictionDate, String topJobRole, Double confidenceScore) {
        this.id = id;
        this.predictionId = predictionId;
        this.predictionDate = predictionDate;
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

    public Long getPredictionId() {
        return predictionId;
    }

    public void setPredictionId(Long predictionId) {
        this.predictionId = predictionId;
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

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getCertificationsList() {
        return certificationsList;
    }

    public void setCertificationsList(String certificationsList) {
        this.certificationsList = certificationsList;
    }

    public String getIndustryPreference() {
        return industryPreference;
    }

    public void setIndustryPreference(String industryPreference) {
        this.industryPreference = industryPreference;
    }

    public String getSkillsList() {
        return skillsList;
    }

    public void setSkillsList(String skillsList) {
        this.skillsList = skillsList;
    }
}
