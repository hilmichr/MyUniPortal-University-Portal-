package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.UniteEnseignement;
import com.esprit.elearningback.repository.CoefOptionRepository;
import com.esprit.elearningback.repository.SpecialiteRepository;
import com.esprit.elearningback.repository.UniteEnseignementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UniteEnseignementServiceImpl implements IUniteEnseignementService{
    CoefOptionRepository coefOptionRepository;
    SpecialiteRepository SpecialiteRepository;
    UniteEnseignementRepository uniteEnseignementRepository;

    @Override
    public List<UniteEnseignement> retrieveAllUes() {
        return uniteEnseignementRepository.findAll();
    }

    @Override
    public UniteEnseignement retrieveUe(Long idUe) {
        return uniteEnseignementRepository.findById(idUe).orElse(null);
    }

    @Override
    public UniteEnseignement addUe(UniteEnseignement c) {
        return uniteEnseignementRepository.save(c);
    }

    @Override
    public void removeUe(Long idUe) {
        uniteEnseignementRepository.deleteById(idUe);
    }

    @Override
    public UniteEnseignement modifyUe(UniteEnseignement ue) {
        UniteEnseignement oldue=uniteEnseignementRepository.findById(ue.getId()).orElse(null);
        oldue.setNom(ue.getNom());
        return uniteEnseignementRepository.save(oldue);
    }
}
