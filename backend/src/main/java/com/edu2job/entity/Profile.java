package com.edu2job.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 100)
    private String degree;

    @Column(length = 100)
    private String major;

    private Double cgpa;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience = 0;

    @Column(name = "industry_preference", length = 100)
    private String industryPreference;

    // Personal Details
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    private Integer age;

    @Column(length = 10)
    private String gender;

    @Column(length = 255)
    private String address;

    // 10th Grade Details
    @Column(name = "school_name_10th", length = 150)
    private String schoolName10th;

    @Column(name = "board_10th", length = 100)
    private String board10th;

    @Column(name = "year_passed_10th")
    private Integer yearPassed10th;

    // 12th/Diploma Grade Details
    @Column(name = "school_name_12th", length = 150)
    private String schoolName12th;

    @Column(name = "board_12th", length = 100)
    private String board12th;

    @Column(name = "year_passed_12th")
    private Integer yearPassed12th;

    @Column(name = "type_12th", length = 20)
    private String type12th;

    // Undergraduate Details
    @Column(name = "university_name_ug", length = 150)
    private String universityNameUG;

    @Column(name = "year_passed_ug")
    private Integer yearPassedUG;

    // Employment Details
    @Column(name = "employment_status", length = 20)
    private String employmentStatus;

    @Column(name = "company_name", length = 150)
    private String companyName;

    @Column(name = "job_role", length = 100)
    private String jobRole;

    @Column(name = "employment_experience")
    private Integer employmentExperience;

    // Additional Details
    @Column(name = "linkedin_profile", length = 255)
    private String linkedinProfile;

    @Column(name = "github_profile", length = 255)
    private String githubProfile;

    @Column(name = "resume_link", length = 255)
    private String resumeLink;

    // Role & Company Header Titles
    @Column(name = "role_title", length = 100)
    private String roleTitle;

    @Column(name = "company_title", length = 150)
    private String companyTitle;

    @Lob
    @Column(name = "profile_picture")
    private String profilePicture;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Certification> certifications = new ArrayList<>();

    // Constructors
    public Profile() {}

    public Profile(User user) {
        this.user = user;
    }

    // Helper methods to manage skills
    public void addSkill(Skill skill) {
        skills.add(skill);
        skill.setProfile(this);
    }

    public void removeSkill(Skill skill) {
        skills.remove(skill);
        skill.setProfile(null);
    }

    // Helper methods to manage certifications
    public void addCertification(Certification cert) {
        certifications.add(cert);
        cert.setProfile(this);
    }

    public void removeCertification(Certification cert) {
        certifications.remove(cert);
        cert.setProfile(null);
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

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public List<Certification> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<Certification> certifications) {
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
