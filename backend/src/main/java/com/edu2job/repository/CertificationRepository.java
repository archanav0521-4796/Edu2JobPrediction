package com.edu2job.repository;

import com.edu2job.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    void deleteByProfileId(Long profileId);
}
