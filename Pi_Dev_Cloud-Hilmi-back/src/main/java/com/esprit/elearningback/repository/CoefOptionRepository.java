package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.CoefOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CoefOptionRepository extends JpaRepository<CoefOption, Long> {
    @Query("SELECT co FROM CoefOption co WHERE co.specialite.id = :specialiteId AND co.uniteEnseignement.id= :uniteEnseignementId")
    CoefOption findBySpecialiteIdAndUniteEnseignementId(Long specialiteId, Long uniteEnseignementId);
}
