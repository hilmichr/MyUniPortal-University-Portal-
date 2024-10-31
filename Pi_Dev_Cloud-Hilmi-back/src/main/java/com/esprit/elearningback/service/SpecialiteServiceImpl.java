package com.esprit.elearningback.service;


import com.esprit.elearningback.entity.CoefOption;
import com.esprit.elearningback.entity.Specialite;
import com.esprit.elearningback.entity.UniteEnseignement;
import com.esprit.elearningback.entity.User;
import com.esprit.elearningback.repository.CoefOptionRepository;
import com.esprit.elearningback.repository.SpecialiteRepository;
import com.esprit.elearningback.repository.UniteEnseignementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@AllArgsConstructor
public class SpecialiteServiceImpl implements ISpecialiteService {
    SpecialiteRepository specialiteRepository;
    UniteEnseignementRepository ueRepository;
    CoefOptionRepository coefOptionRepository;
    CoefOptionServiceImp coefOptionService;
    EmailService emailService;
    IUserService userService;
    public List<Specialite> retrieveAllSpecialites() {
        return specialiteRepository.findAll();
    }
    public Specialite retrieveSpecialite(Long SpecialiteId) {
        return specialiteRepository.findById(SpecialiteId).get();
    }
        public Specialite addSpecialite(Specialite c) {
            Set<CoefOption> coefOptions = c.getCoefOptions();
            for (CoefOption coefOption : coefOptions) {
                UniteEnseignement ue= ueRepository.findById(coefOption.getUniteEnseignement().getId()).orElse(null);
                ue.getCoefOptions().add(coefOption);
                coefOption.setUniteEnseignement(ue);
                coefOption.setSpecialite(c);
                c.getCoefOptions().add(coefOption);
            }
            String subject = "new option";
            String body = "New Option was added to esprit ,option name:"+ c.getNom();
            for (User user : userService.retrieveAllUsers()){
                emailService.sendEmail(user.getUseremail(), subject, body);
            }
            return specialiteRepository.save(c);
        }
    public void removeSpecialite(Long SpecialiteId) {
        specialiteRepository.deleteById(SpecialiteId);
    }
    public Specialite modifySpecialite(Specialite specialite) {
        for (CoefOption coefOption : specialite.getCoefOptions()) {
            coefOption.setSpecialite(specialite);
        }
        return specialiteRepository.save(specialite);
    }

    public Specialite updatePdfFile(Specialite specialite, String filePath) {
        specialite.setPdfFile(filePath);
        return specialiteRepository.save(specialite);
    }

    public Map<String, Double> calculeScore(Map<Long, Double> moyParUE,double moyenneGeneral) {
        List<Specialite> specialites = specialiteRepository.findAll();
        Map<String, Double> moyForEachSpecialite = new HashMap<String, Double>();
        for (Specialite specialite : specialites) {
            double score=moyenneGeneral*0.4;
            for(Map.Entry<Long, Double> moyParUEEntry : moyParUE.entrySet()) {
                CoefOption coefOption= coefOptionService.getCoefOptionForScor(specialite.getId(),moyParUEEntry.getKey());
                if (coefOption != null) {
                    score += moyParUEEntry.getValue() * ((double) coefOption.getCoefficient() / 100);
                }
            }
            moyForEachSpecialite.put(specialite.getNom(),score);
        }
        return moyForEachSpecialite;
    }
}

