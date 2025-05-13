package com.esprit.elearningback.repository;

import java.util.Optional;

import com.esprit.elearningback.entity.ResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository



public interface ResetTokenRepository extends JpaRepository<ResetToken, Long> {
    Optional<ResetToken> findByToken(String token);

    void deleteByToken(String token);
}
