package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository
        extends JpaRepository<Subject,Long> {


    Subject findBySubjectId(long subjectid);

    // Optional<Subject> findSubjectByIdsubject(long subjectid);


}
