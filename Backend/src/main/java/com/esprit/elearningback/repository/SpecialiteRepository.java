package com.esprit.elearningback.repository;
import com.esprit.elearningback.entity.Specialite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SpecialiteRepository extends JpaRepository<Specialite, Long> {


}
