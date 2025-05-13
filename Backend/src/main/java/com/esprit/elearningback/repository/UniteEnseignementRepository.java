package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.UniteEnseignement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniteEnseignementRepository extends JpaRepository<UniteEnseignement,Long> {
}
