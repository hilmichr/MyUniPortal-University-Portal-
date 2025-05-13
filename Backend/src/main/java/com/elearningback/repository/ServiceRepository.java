package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository
        extends JpaRepository<Service,Long> {

    @Query("SELECT s FROM Service s WHERE s.subject.subjectId = :subjectId")
    List<Service> findBySubjectId(@Param("subjectId") Long subjectId);

    Service findByServiceId(long serviceId);





}
