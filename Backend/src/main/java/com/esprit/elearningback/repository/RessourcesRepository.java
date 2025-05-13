package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.Ressources;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RessourcesRepository
        extends JpaRepository<Ressources,Long> {

    Ressources findByRessourceName(String Ressource_name);

    @Query("SELECT r FROM Ressources r WHERE r.service.serviceId = :serviceId")
    List<Ressources> getRessourcesByService(@Param("serviceId") long serviceId);



}
