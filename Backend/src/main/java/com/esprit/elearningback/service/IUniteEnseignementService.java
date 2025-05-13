package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.UniteEnseignement;

import java.util.List;

public interface IUniteEnseignementService {
    public List<UniteEnseignement> retrieveAllUes();
    public UniteEnseignement retrieveUe(Long idUe);
    public UniteEnseignement addUe(UniteEnseignement c);
    public void removeUe(Long idUe);
    public UniteEnseignement modifyUe(UniteEnseignement ue);
}
