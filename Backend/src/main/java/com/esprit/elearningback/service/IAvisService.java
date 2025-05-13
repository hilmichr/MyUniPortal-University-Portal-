package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Avis;

import java.util.List;

public interface IAvisService {
    public List<Avis> retrieveAllAvis();
    public Avis retrieveAvis (Long avis);
    public Avis addAvis (Avis a);
    public void removeAvis (Long avis);
    public Avis modifyAvis (Avis avis);
    Avis AvisAndAssign(Avis avis, long IdEvent);
    public List<Avis> retrieveAvisByEvent(Long eventId);
}
