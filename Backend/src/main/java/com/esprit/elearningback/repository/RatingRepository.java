package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository
        extends JpaRepository<Rating,Long> {

    @Query("SELECT r.rating, COUNT(s) " +
            "FROM Rating r " +
            "JOIN r.service s " +
            "GROUP BY r.rating")
    List<Object[]> countServicesByRating();

    @Query("SELECT r " +
            "FROM Rating r " +
            "where r.service.serviceId= :serviceId")
    List<Rating> findByServiceId(Long serviceId);
}
