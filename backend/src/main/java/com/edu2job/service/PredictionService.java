package com.edu2job.service;

import com.edu2job.dto.*;
import com.edu2job.entity.*;
import com.edu2job.exception.ResourceNotFoundException;
import com.edu2job.repository.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PredictionService {

    @Autowired
    private PredictionRepository predictionRepository;

    @Autowired
    private PredictionHistoryRepository historyRepository;

    @Autowired
    private UserRepository userRepository;

    // Define standard roles and their profiles
    private static class JobProfile {
        String roleName;
        List<String> keySkills;
        List<String> certifications;
        List<String> preferredMajors;
        List<String> preferredIndustries;
        String explanationTemplate;
        int minExperience;

        JobProfile(String roleName, List<String> keySkills, List<String> certifications, 
                   List<String> preferredMajors, List<String> preferredIndustries, 
                   String explanationTemplate, int minExperience) {
            this.roleName = roleName;
            this.keySkills = keySkills;
            this.certifications = certifications;
            this.preferredMajors = preferredMajors;
            this.preferredIndustries = preferredIndustries;
            this.explanationTemplate = explanationTemplate;
            this.minExperience = minExperience;
        }
    }

    private final List<JobProfile> jobProfiles = new ArrayList<>();

    public PredictionService() {
        // Initialize job rules
        jobProfiles.add(new JobProfile(
                "Software Engineer",
                Arrays.asList("Java", "C++", "Python", "C", "SQL", "HTML", "CSS", "JavaScript", "TypeScript", "Go", "Rust", "Git"),
                Arrays.asList("Oracle Certified Professional: Java SE 17 Developer", "Microsoft Certified: Azure Developer Associate"),
                Arrays.asList("Computer Science", "Software Engineering", "Information Technology", "Computer Engineering"),
                Arrays.asList("IT & Software Services", "Finance & FinTech", "E-commerce & Retail"),
                "Your strong programming skills in %s and your %s major match key requirements for software development teams.",
                0
        ));

        jobProfiles.add(new JobProfile(
                "Data Scientist",
                Arrays.asList("Python", "SQL", "Machine Learning", "Data Analysis", "Artificial Intelligence", "MongoDB", "Statistics", "Deep Learning", "TensorFlow", "PyTorch"),
                Arrays.asList("Google Cloud Certified Professional Data Engineer", "AWS Certified Solutions Architect - Associate"),
                Arrays.asList("Data Science", "Computer Science", "Mathematics", "Statistics", "Artificial Intelligence"),
                Arrays.asList("IT & Software Services", "Healthcare & HealthTech", "Finance & FinTech", "E-commerce & Retail"),
                "Your background in %s and focus on %s align perfectly with data analysis and machine learning workflows.",
                1
        ));

        jobProfiles.add(new JobProfile(
                "Cloud Architect",
                Arrays.asList("Cloud Computing", "Java", "Python", "JavaScript", "SQL", "AWS", "Google Cloud (GCP)", "Microsoft Azure", "Terraform"),
                Arrays.asList("AWS Certified Solutions Architect - Associate", "Google Cloud Certified Professional Cloud Architect", "Microsoft Certified: Azure Administrator Associate", "HashiCorp Certified: Terraform Associate"),
                Arrays.asList("Computer Science", "Information Technology", "Software Engineering", "Cloud Computing"),
                Arrays.asList("IT & Software Services", "E-commerce & Retail", "Finance & FinTech", "Telecommunications"),
                "Your cloud certifications (%s) and technical skills qualify you to design and manage modern cloud infrastructure.",
                2
        ));

        jobProfiles.add(new JobProfile(
                "DevOps Engineer",
                Arrays.asList("Cloud Computing", "Python", "JavaScript", "SQL", "HTML", "CSS", "Java", "Docker", "Kubernetes", "CI/CD Pipelines", "Git", "Terraform"),
                Arrays.asList("Red Hat Certification", "AWS Certified Solutions Architect - Associate", "Microsoft Certified: Azure Administrator Associate", "Certified Kubernetes Administrator (CKA)", "HashiCorp Certified: Terraform Associate"),
                Arrays.asList("Computer Science", "Software Engineering", "Information Technology"),
                Arrays.asList("IT & Software Services", "E-commerce & Retail", "Finance & FinTech"),
                "Your expertise in systems configuration, %s scripting, and %s certifications make you an excellent fit for DevOps roles.",
                1
        ));

        jobProfiles.add(new JobProfile(
                "Full Stack Developer",
                Arrays.asList("JavaScript", "React", "Node.js", "HTML", "CSS", "SQL", "MongoDB", "Spring Boot", "Java", "TypeScript", "Next.js", "Angular", "Vue.js", "Express.js", "MySQL", "PostgreSQL", "Firebase"),
                Arrays.asList("Microsoft Certified: Azure Developer Associate", "Oracle Certified Professional: Java SE 17 Developer"),
                Arrays.asList("Computer Science", "Software Engineering", "Information Technology"),
                Arrays.asList("IT & Software Services", "E-commerce & Retail", "Finance & FinTech", "Healthcare & HealthTech"),
                "Your front-end and back-end skills in %s match the requirements for building end-to-end web applications.",
                0
        ));

        jobProfiles.add(new JobProfile(
                "Cyber Security Specialist",
                Arrays.asList("Python", "C", "C++", "SQL", "Cloud Computing", "JavaScript", "Git"),
                Arrays.asList("Cisco Certified Network Associate (CCNA)", "CompTIA Security+", "Certified Information Systems Security Professional (CISSP)", "Cisco Certified Network Professional (CCNP)"),
                Arrays.asList("Computer Science", "Information Security", "Cyber Security", "Information Technology"),
                Arrays.asList("Finance & FinTech", "IT & Software Services", "Healthcare & HealthTech", "Telecommunications"),
                "Your network credentials (%s) and security-focused mindset fit the profiles required to secure systems and data.",
                1
        ));

        jobProfiles.add(new JobProfile(
                "AI/ML Engineer",
                Arrays.asList("Python", "Machine Learning", "Deep Learning", "Artificial Intelligence", "TensorFlow", "PyTorch", "Natural Language Processing (NLP)", "Computer Vision", "SQL"),
                Arrays.asList("TensorFlow Developer Certificate", "Google Cloud Certified Professional Data Engineer", "AWS Certified Solutions Architect - Associate"),
                Arrays.asList("Artificial Intelligence", "Data Science", "Computer Science", "Mathematics", "Statistics"),
                Arrays.asList("IT & Software Services", "Healthcare & HealthTech", "Automotive & Autonomous Systems", "Research"),
                "Your background in %s and your %s major match key requirements for artificial intelligence roles.",
                1
        ));

        jobProfiles.add(new JobProfile(
                "Data Engineer",
                Arrays.asList("Python", "SQL", "Java", "Scala", "Spark", "Hadoop", "Cloud Computing", "PostgreSQL", "MySQL", "MongoDB"),
                Arrays.asList("Google Cloud Certified Professional Data Engineer", "AWS Certified Solutions Architect - Associate", "Microsoft Certified: Azure Administrator Associate"),
                Arrays.asList("Computer Science", "Information Technology", "Statistics", "Data Science"),
                Arrays.asList("IT & Software Services", "Finance & FinTech", "E-commerce & Retail", "Telecommunications"),
                "Your skills in data handling via %s and your %s major align with data architecture demands.",
                1
        ));

        jobProfiles.add(new JobProfile(
                "Product Manager",
                Arrays.asList("Agile Methodology", "Jira", "Scrum", "SQL", "Data Analysis", "Statistics"),
                Arrays.asList("PMP (Project Management Professional)", "Scrum Alliance Certified ScrumMaster (CSM)", "PMI Agile Certified Practitioner (PMI-ACP)"),
                Arrays.asList("Marketing", "Finance", "Business Administration", "Computer Science", "Information Technology"),
                Arrays.asList("IT & Software Services", "Finance & FinTech", "E-commerce & Retail", "Entertainment & Media"),
                "Your experience in %s methodologies and your %s major prepare you for product strategy.",
                2
        ));

        jobProfiles.add(new JobProfile(
                "QA/Test Automation Engineer",
                Arrays.asList("Java", "Python", "Selenium", "JavaScript", "HTML", "CSS", "QA Automation", "Git"),
                Arrays.asList("Oracle Certified Professional: Java SE 17 Developer", "Cisco Certified Network Associate (CCNA)"),
                Arrays.asList("Computer Science", "Software Engineering", "Information Technology"),
                Arrays.asList("IT & Software Services", "E-commerce & Retail", "Finance & FinTech"),
                "Your automation skills in %s and your %s major qualify you for QA engineer positions.",
                0
        ));

        jobProfiles.add(new JobProfile(
                "UI/UX Designer",
                Arrays.asList("Figma", "UI/UX Design", "HTML", "CSS", "JavaScript", "React"),
                Arrays.asList("None"),
                Arrays.asList("Computer Science", "Software Engineering", "Information Technology"),
                Arrays.asList("IT & Software Services", "E-commerce & Retail", "Entertainment & Media"),
                "Your design skills in %s and your %s major fit the creative requirements for UI/UX roles.",
                0
        ));

        jobProfiles.add(new JobProfile(
                "Mobile App Developer",
                Arrays.asList("Swift", "Kotlin", "Java", "Flutter", "React Native", "JavaScript", "TypeScript", "Firebase", "Git"),
                Arrays.asList("Salesforce Certified Platform Developer I", "Oracle Certified Professional: Java SE 17 Developer"),
                Arrays.asList("Computer Science", "Software Engineering", "Information Technology"),
                Arrays.asList("IT & Software Services", "Entertainment & Media", "E-commerce & Retail", "Healthcare & HealthTech"),
                "Your app development skills in %s and your %s major match mobile product design requirements.",
                0
        ));
    }

    @Transactional
    public PredictionResponse predictAndSave(String email, PredictionRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        List<CareerRecommendation> recommendations = new ArrayList<>();

        // Match against all pre-defined jobs
        for (JobProfile job : jobProfiles) {
            double score = 30.0; // Base score

            // Match Skills
            long matchingSkillsCount = request.getSkills().stream()
                    .filter(s -> job.keySkills.stream().anyMatch(js -> js.equalsIgnoreCase(s)))
                    .count();
            score += matchingSkillsCount * 12.0;

            // Match Certifications
            long matchingCertsCount = request.getCertifications().stream()
                    .filter(c -> job.certifications.stream().anyMatch(jc -> jc.equalsIgnoreCase(c)))
                    .count();
            score += matchingCertsCount * 15.0;

            // Match Major
            boolean majorMatch = job.preferredMajors.stream()
                    .anyMatch(m -> m.equalsIgnoreCase(request.getMajor()));
            if (majorMatch) {
                score += 15.0;
            }

            // Match Industry Preference
            boolean industryMatch = job.preferredIndustries.stream()
                    .anyMatch(i -> i.equalsIgnoreCase(request.getIndustryPreference()));
            if (industryMatch) {
                score += 10.0;
            }

            // Experience Factor
            int expDiff = request.getYearsOfExperience() - job.minExperience;
            if (expDiff >= 0) {
                score += Math.min(expDiff * 5.0, 15.0); // Experience bonus
            } else {
                score -= Math.abs(expDiff) * 10.0; // Penalty if under-experienced
            }

            // CGPA Factor
            if (request.getCgpa() != null) {
                score += (request.getCgpa() - 6.0) * 5.0; // GPA bonus or penalty (centered around 6.0)
            }

            // Clamp score between 10% and 98%
            double confidence = Math.max(10.0, Math.min(98.0, score));
            
            // Format explanation
            String matchedSkillsStr = request.getSkills().stream()
                    .filter(s -> job.keySkills.stream().anyMatch(js -> js.equalsIgnoreCase(s)))
                    .limit(2)
                    .collect(Collectors.joining(" and "));
            if (matchedSkillsStr.isEmpty()) {
                matchedSkillsStr = "programming";
            }

            String matchedCertsStr = request.getCertifications().stream()
                    .filter(c -> job.certifications.stream().anyMatch(jc -> jc.equalsIgnoreCase(c)))
                    .limit(1)
                    .collect(Collectors.joining());
            if (matchedCertsStr.isEmpty()) {
                matchedCertsStr = "relevant study";
            }

            String explanation;
            if (job.roleName.contains("Cloud") || job.roleName.contains("Security")) {
                explanation = String.format(job.explanationTemplate, matchedCertsStr);
            } else {
                explanation = String.format(job.explanationTemplate, matchedSkillsStr, request.getMajor());
            }

            recommendations.add(new CareerRecommendation(job.roleName, confidence, explanation, false));
        }

        // Sort recommendations by confidence percentage descending
        recommendations.sort((r1, r2) -> Double.compare(r2.getConfidencePercentage(), r1.getConfidencePercentage()));

        // Mark the highest recommendation
        if (!recommendations.isEmpty()) {
            recommendations.get(0).setHighest(true);
        }

        // Get top 5 recommendations
        List<CareerRecommendation> topRecommendations = recommendations.stream()
                .limit(5)
                .collect(Collectors.toList());

        String topRole = topRecommendations.get(0).getJobRole();
        double topConfidence = topRecommendations.get(0).getConfidencePercentage();

        // Save prediction record
        Prediction prediction = new Prediction();
        prediction.setUser(user);
        prediction.setDegree(request.getDegree());
        prediction.setMajor(request.getMajor());
        prediction.setCgpa(request.getCgpa());
        prediction.setYearsOfExperience(request.getYearsOfExperience());
        prediction.setSkillsList(String.join(", ", request.getSkills()));
        prediction.setCertificationsList(String.join(", ", request.getCertifications()));
        prediction.setIndustryPreference(request.getIndustryPreference());
        prediction.setTopJobRole(topRole);
        prediction.setConfidenceScore(topConfidence);

        Prediction savedPrediction = predictionRepository.save(prediction);

        // Save history record
        PredictionHistory history = new PredictionHistory(user, savedPrediction, topRole, topConfidence);
        historyRepository.save(history);

        return new PredictionResponse(
                savedPrediction.getId(),
                savedPrediction.getPredictionDate(),
                topRole,
                topConfidence,
                topRecommendations
        );
    }

    @Transactional(readOnly = true)
    public List<PredictionHistoryDto> getHistory(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        return historyRepository.findByUserIdOrderByPredictionDateDesc(user.getId()).stream()
                .map(h -> {
                    PredictionHistoryDto dto = new PredictionHistoryDto(
                        h.getId(),
                        h.getPrediction().getId(),
                        h.getPredictionDate(),
                        h.getTopJobRole(),
                        h.getConfidenceScore()
                    );
                    Prediction p = h.getPrediction();
                    dto.setDegree(p.getDegree());
                    dto.setMajor(p.getMajor());
                    dto.setCgpa(p.getCgpa());
                    dto.setYearsOfExperience(p.getYearsOfExperience());
                    dto.setCertificationsList(p.getCertificationsList());
                    dto.setIndustryPreference(p.getIndustryPreference());
                    dto.setSkillsList(p.getSkillsList());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PredictionHistoryDto> searchHistory(String email, String query) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        return historyRepository.findByUserIdAndTopJobRoleContainingIgnoreCaseOrderByPredictionDateDesc(user.getId(), query).stream()
                .map(h -> {
                    PredictionHistoryDto dto = new PredictionHistoryDto(
                        h.getId(),
                        h.getPrediction().getId(),
                        h.getPredictionDate(),
                        h.getTopJobRole(),
                        h.getConfidenceScore()
                    );
                    Prediction p = h.getPrediction();
                    dto.setDegree(p.getDegree());
                    dto.setMajor(p.getMajor());
                    dto.setCgpa(p.getCgpa());
                    dto.setYearsOfExperience(p.getYearsOfExperience());
                    dto.setCertificationsList(p.getCertificationsList());
                    dto.setIndustryPreference(p.getIndustryPreference());
                    dto.setSkillsList(p.getSkillsList());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteHistory(String email, Long historyId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        PredictionHistory history = historyRepository.findById(historyId)
                .orElseThrow(() -> new ResourceNotFoundException("History record not found: " + historyId));

        if (!history.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Unauthorized deletion request.");
        }

        // Delete prediction (which cascades to history because of database foreign key constraints)
        predictionRepository.delete(history.getPrediction());
    }
}
