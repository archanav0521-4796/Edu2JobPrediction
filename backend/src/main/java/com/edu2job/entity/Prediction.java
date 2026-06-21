package com.edu2job.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "predictions")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(name = "prediction_date", nullable = false, updatable = false)
    private LocalDateTime predictionDate;

    @Column(nullable = false, length = 100)
    private String degree;

    @Column(nullable = false, length = 100)
    private String major;

    @Column(nullable = false)
    private Double cgpa;

    @Column(name = "years_of_experience", nullable = false)
    private Integer yearsOfExperience;

    @Column(name = "skills_list", nullable = false, columnDefinition = "TEXT")
    private String skillsList;

    @Column(name = "certifications_list", nullable = false, columnDefinition = "TEXT")
    private String certificationsList;

    @Column(name = "industry_preference", nullable = false, length = 100)
    private String industryPreference;

    @Column(name = "top_job_role", nullable = false, length = 100)
    private String topJobRole;

    @Column(name = "confidence_score", nullable = false)
    private Double confidenceScore;

    // Constructors
    public Prediction() {}

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

    public LocalDateTime getPredictionDate() {
        return predictionDate;
    }

    public void setPredictionDate(LocalDateTime predictionDate) {
        this.predictionDate = predictionDate;
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

    public String getSkillsList() {
        return skillsList;
    }

    public void setSkillsList(String skillsList) {
        this.skillsList = skillsList;
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
}
