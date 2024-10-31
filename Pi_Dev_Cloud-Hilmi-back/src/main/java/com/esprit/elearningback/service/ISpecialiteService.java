package com.esprit.elearningback.service;
import com.esprit.elearningback.entity.Specialite;

import java.util.List;
import java.util.Map;

public interface ISpecialiteService {

    public List<Specialite> retrieveAllSpecialites();
    public Specialite retrieveSpecialite(Long idSpecialite);
    public Specialite addSpecialite(Specialite c);
    public void removeSpecialite(Long idSpecialite);
    public Specialite modifySpecialite(Specialite specialite);

    public Specialite updatePdfFile(Specialite specialite, String filePath);
    public Map<String, Double> calculeScore(Map<Long, Double> moyParUE, double moyenneGeneral);
}