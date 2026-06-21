package com.edu2job.dto;

import jakarta.validation.constraints.*;
import java.util.ArrayList;
import java.util.List;

public class PredictionRequest {

    @NotBlank(message = "Degree is required")
    private String degree;

    @NotBlank(message = "Major is required")
    private String major;

    @NotNull(message = "CGPA is required")
    @Min(value = 0, message = "CGPA cannot be negative")
    @Max(value = 10, message = "CGPA cannot exceed 10.0")
    private Double cgpa;

    @NotNull(message = "Years of experience is required")
    @Min(value = 0, message = "Experience cannot be negative")
    private Integer yearsOfExperience;

    @NotBlank(message = "Industry preference is required")
    private String industryPreference;

    private List<String> skills = new ArrayList<>();
    private List<String> certifications = new ArrayList<>();

    // Getters and Setters
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

    public String getIndustryPreference() {
        return industryPreference;
    }

    public void setIndustryPreference(String industryPreference) {
        this.industryPreference = industryPreference;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<String> certifications) {
        this.certifications = certifications;
    }
}
