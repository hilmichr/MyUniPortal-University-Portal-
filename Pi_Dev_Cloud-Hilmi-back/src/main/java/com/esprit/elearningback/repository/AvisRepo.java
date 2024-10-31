package com.esprit.elearningback.repository;



import com.esprit.elearningback.entity.Avis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvisRepo extends JpaRepository<Avis,Long> {
    List<Avis> findByEventId(long eventId);
}
