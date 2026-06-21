package com.edu2job.service;

import com.edu2job.dto.ProfileDto;
import com.edu2job.entity.Certification;
import com.edu2job.entity.Profile;
import com.edu2job.entity.Skill;
import com.edu2job.exception.ResourceNotFoundException;
import com.edu2job.repository.ProfileRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Transactional(readOnly = true)
    public ProfileDto getProfile(String email) {
        Profile profile = profileRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found for user: " + email));

        ProfileDto dto = new ProfileDto();
        
        // Professional Info
        dto.setDegree(profile.getDegree());
        dto.setMajor(profile.getMajor());
        dto.setCgpa(profile.getCgpa());
        dto.setYearsOfExperience(profile.getYearsOfExperience());
        dto.setIndustryPreference(profile.getIndustryPreference());

        // Collections
        dto.setSkills(profile.getSkills().stream().map(Skill::getSkillName).collect(Collectors.toList()));
        dto.setCertifications(profile.getCertifications().stream().map(Certification::getCertificationName).collect(Collectors.toList()));

        // Personal Details
        dto.setPhoneNumber(profile.getPhoneNumber());
        dto.setAge(profile.getAge());
        dto.setGender(profile.getGender());
        dto.setAddress(profile.getAddress());

        // Education
        dto.setSchoolName10th(profile.getSchoolName10th());
        dto.setBoard10th(profile.getBoard10th());
        dto.setYearPassed10th(profile.getYearPassed10th());

        dto.setSchoolName12th(profile.getSchoolName12th());
        dto.setBoard12th(profile.getBoard12th());
        dto.setYearPassed12th(profile.getYearPassed12th());
        dto.setType12th(profile.getType12th());

        dto.setUniversityNameUG(profile.getUniversityNameUG());
        dto.setYearPassedUG(profile.getYearPassedUG());

        // Employment
        dto.setEmploymentStatus(profile.getEmploymentStatus());
        dto.setCompanyName(profile.getCompanyName());
        dto.setJobRole(profile.getJobRole());
        dto.setEmploymentExperience(profile.getEmploymentExperience());

        // Links
        dto.setLinkedinProfile(profile.getLinkedinProfile());
        dto.setGithubProfile(profile.getGithubProfile());
        dto.setResumeLink(profile.getResumeLink());

        // Header Titles
        dto.setRoleTitle(profile.getRoleTitle());
        dto.setCompanyTitle(profile.getCompanyTitle());
        dto.setProfilePicture(profile.getProfilePicture());

        return dto;
    }

    @Transactional
    public ProfileDto updateProfile(String email, ProfileDto dto) {
        Profile profile = profileRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found for user: " + email));

        // Update professional details
        profile.setDegree(dto.getDegree());
        profile.setMajor(dto.getMajor());
        profile.setCgpa(dto.getCgpa());
        profile.setYearsOfExperience(dto.getYearsOfExperience());
        profile.setIndustryPreference(dto.getIndustryPreference());

        // Update skills: differential update
        List<String> newSkillNames = dto.getSkills() != null ? 
            dto.getSkills().stream()
                .filter(s -> s != null && !s.trim().isEmpty())
                .map(String::trim)
                .collect(Collectors.toList()) 
            : new java.util.ArrayList<>();
            
        profile.getSkills().removeIf(s -> !newSkillNames.contains(s.getSkillName()));
        
        List<String> existingSkillNames = profile.getSkills().stream().map(Skill::getSkillName).collect(Collectors.toList());
        for (String skillName : newSkillNames) {
            if (!existingSkillNames.contains(skillName)) {
                profile.addSkill(new Skill(skillName));
            }
        }

        // Update certifications: differential update
        List<String> newCertNames = dto.getCertifications() != null ? 
            dto.getCertifications().stream()
                .filter(c -> c != null && !c.trim().isEmpty())
                .map(String::trim)
                .collect(Collectors.toList()) 
            : new java.util.ArrayList<>();
            
        profile.getCertifications().removeIf(c -> !newCertNames.contains(c.getCertificationName()));
        
        List<String> existingCertNames = profile.getCertifications().stream().map(Certification::getCertificationName).collect(Collectors.toList());
        for (String certName : newCertNames) {
            if (!existingCertNames.contains(certName)) {
                profile.addCertification(new Certification(certName));
            }
        }

        // Update personal details
        profile.setPhoneNumber(dto.getPhoneNumber());
        profile.setAge(dto.getAge());
        profile.setGender(dto.getGender());
        profile.setAddress(dto.getAddress());

        // Update education
        profile.setSchoolName10th(dto.getSchoolName10th());
        profile.setBoard10th(dto.getBoard10th());
        profile.setYearPassed10th(dto.getYearPassed10th());

        profile.setSchoolName12th(dto.getSchoolName12th());
        profile.setBoard12th(dto.getBoard12th());
        profile.setYearPassed12th(dto.getYearPassed12th());
        profile.setType12th(dto.getType12th());

        profile.setUniversityNameUG(dto.getUniversityNameUG());
        profile.setYearPassedUG(dto.getYearPassedUG());

        // Update employment
        profile.setEmploymentStatus(dto.getEmploymentStatus());
        profile.setCompanyName(dto.getCompanyName());
        profile.setJobRole(dto.getJobRole());
        profile.setEmploymentExperience(dto.getEmploymentExperience());

        // Update links
        profile.setLinkedinProfile(dto.getLinkedinProfile());
        profile.setGithubProfile(dto.getGithubProfile());
        profile.setResumeLink(dto.getResumeLink());

        // Update titles
        profile.setRoleTitle(dto.getRoleTitle());
        profile.setCompanyTitle(dto.getCompanyTitle());
        profile.setProfilePicture(dto.getProfilePicture());

        Profile updatedProfile = profileRepository.save(profile);

        // Map back to DTO
        ProfileDto responseDto = new ProfileDto();
        responseDto.setDegree(updatedProfile.getDegree());
        responseDto.setMajor(updatedProfile.getMajor());
        responseDto.setCgpa(updatedProfile.getCgpa());
        responseDto.setYearsOfExperience(updatedProfile.getYearsOfExperience());
        responseDto.setIndustryPreference(updatedProfile.getIndustryPreference());

        responseDto.setSkills(updatedProfile.getSkills().stream().map(Skill::getSkillName).collect(Collectors.toList()));
        responseDto.setCertifications(updatedProfile.getCertifications().stream().map(Certification::getCertificationName).collect(Collectors.toList()));

        responseDto.setPhoneNumber(updatedProfile.getPhoneNumber());
        responseDto.setAge(updatedProfile.getAge());
        responseDto.setGender(updatedProfile.getGender());
        responseDto.setAddress(updatedProfile.getAddress());

        responseDto.setSchoolName10th(updatedProfile.getSchoolName10th());
        responseDto.setBoard10th(updatedProfile.getBoard10th());
        responseDto.setYearPassed10th(updatedProfile.getYearPassed10th());

        responseDto.setSchoolName12th(updatedProfile.getSchoolName12th());
        responseDto.setBoard12th(updatedProfile.getBoard12th());
        responseDto.setYearPassed12th(updatedProfile.getYearPassed12th());
        responseDto.setType12th(updatedProfile.getType12th());

        responseDto.setUniversityNameUG(updatedProfile.getUniversityNameUG());
        responseDto.setYearPassedUG(updatedProfile.getYearPassedUG());

        responseDto.setEmploymentStatus(updatedProfile.getEmploymentStatus());
        responseDto.setCompanyName(updatedProfile.getCompanyName());
        responseDto.setJobRole(updatedProfile.getJobRole());
        responseDto.setEmploymentExperience(updatedProfile.getEmploymentExperience());

        responseDto.setLinkedinProfile(updatedProfile.getLinkedinProfile());
        responseDto.setGithubProfile(updatedProfile.getGithubProfile());
        responseDto.setResumeLink(updatedProfile.getResumeLink());

        responseDto.setRoleTitle(updatedProfile.getRoleTitle());
        responseDto.setCompanyTitle(updatedProfile.getCompanyTitle());
        responseDto.setProfilePicture(updatedProfile.getProfilePicture());

        return responseDto;
    }
}
