package com.edu2job.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "certifications", uniqueConstraints = @UniqueConstraint(columnNames = {"profile_id", "certification_name"}))
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    @JsonIgnore
    private Profile profile;

    @Column(name = "certification_name", nullable = false, length = 150)
    private String certificationName;

    // Constructors
    public Certification() {}

    public Certification(String certificationName) {
        this.certificationName = certificationName;
    }

    public Certification(Profile profile, String certificationName) {
        this.profile = profile;
        this.certificationName = certificationName;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public String getCertificationName() {
        return certificationName;
    }

    public void setCertificationName(String certificationName) {
        this.certificationName = certificationName;
    }
}
