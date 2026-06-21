package com.edu2job.dto;

import java.util.ArrayList;
import java.util.List;

public class ProfileDto {

    private String degree;
    private String major;
    private Double cgpa;
    private Integer yearsOfExperience;
    private String industryPreference;
    private List<String> skills = new ArrayList<>();
    private List<String> certifications = new ArrayList<>();

    // Personal Details
    private String phoneNumber;
    private Integer age;
    private String gender;
    private String address;

    // 10th Details
    private String schoolName10th;
    private String board10th;
    private Integer yearPassed10th;

    // 12th Details
    private String schoolName12th;
    private String board12th;
    private Integer yearPassed12th;
    private String type12th;

    // UG Details
    private String universityNameUG;
    private Integer yearPassedUG;

    // Employment Details
    private String employmentStatus;
    private String companyName;
    private String jobRole;
    private Integer employmentExperience;

    // Additional Links
    private String linkedinProfile;
    private String githubProfile;
    private String resumeLink;

    // Role & Company Header Titles
    private String roleTitle;
    private String companyTitle;
    private String profilePicture;

    // Constructors
    public ProfileDto() {}

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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSchoolName10th() {
        return schoolName10th;
    }

    public void setSchoolName10th(String schoolName10th) {
        this.schoolName10th = schoolName10th;
    }

    public String getBoard10th() {
        return board10th;
    }

    public void setBoard10th(String board10th) {
        this.board10th = board10th;
    }

    public Integer getYearPassed10th() {
        return yearPassed10th;
    }

    public void setYearPassed10th(Integer yearPassed10th) {
        this.yearPassed10th = yearPassed10th;
    }

    public String getSchoolName12th() {
        return schoolName12th;
    }

    public void setSchoolName12th(String schoolName12th) {
        this.schoolName12th = schoolName12th;
    }

    public String getBoard12th() {
        return board12th;
    }

    public void setBoard12th(String board12th) {
        this.board12th = board12th;
    }

    public Integer getYearPassed12th() {
        return yearPassed12th;
    }

    public void setYearPassed12th(Integer yearPassed12th) {
        this.yearPassed12th = yearPassed12th;
    }

    public String getType12th() {
        return type12th;
    }

    public void setType12th(String type12th) {
        this.type12th = type12th;
    }

    public String getUniversityNameUG() {
        return universityNameUG;
    }

    public void setUniversityNameUG(String universityNameUG) {
        this.universityNameUG = universityNameUG;
    }

    public Integer getYearPassedUG() {
        return yearPassedUG;
    }

    public void setYearPassedUG(Integer yearPassedUG) {
        this.yearPassedUG = yearPassedUG;
    }

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public Integer getEmploymentExperience() {
        return employmentExperience;
    }

    public void setEmploymentExperience(Integer employmentExperience) {
        this.employmentExperience = employmentExperience;
    }

    public String getLinkedinProfile() {
        return linkedinProfile;
    }

    public void setLinkedinProfile(String linkedinProfile) {
        this.linkedinProfile = linkedinProfile;
    }

    public String getGithubProfile() {
        return githubProfile;
    }

    public void setGithubProfile(String githubProfile) {
        this.githubProfile = githubProfile;
    }

    public String getResumeLink() {
        return resumeLink;
    }

    public void setResumeLink(String resumeLink) {
        this.resumeLink = resumeLink;
    }

    public String getRoleTitle() {
        return roleTitle;
    }

    public void setRoleTitle(String roleTitle) {
        this.roleTitle = roleTitle;
    }

    public String getCompanyTitle() {
        return companyTitle;
    }

    public void setCompanyTitle(String companyTitle) {
        this.companyTitle = companyTitle;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
