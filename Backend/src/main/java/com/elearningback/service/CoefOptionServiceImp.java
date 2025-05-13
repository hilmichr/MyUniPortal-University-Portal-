package com.esprit.elearningback.service;


import com.esprit.elearningback.entity.CoefOption;
import com.esprit.elearningback.repository.CoefOptionRepository;
import com.esprit.elearningback.repository.SpecialiteRepository;
import com.esprit.elearningback.repository.UniteEnseignementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CoefOptionServiceImp implements ICoefOptionService {
    CoefOptionRepository coefOptionRepository;
    SpecialiteRepository SpecialiteRepository;
    UniteEnseignementRepository UniteEnseignementRepository;
    public CoefOption getCoefOptionForScor(Long specialiteId, Long uniteEnseignementId) {
        return coefOptionRepository.findBySpecialiteIdAndUniteEnseignementId(specialiteId, uniteEnseignementId);
    }
}
