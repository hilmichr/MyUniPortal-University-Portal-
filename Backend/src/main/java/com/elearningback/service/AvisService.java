package com.esprit.elearningback.service;


import com.esprit.elearningback.entity.Avis;
import com.esprit.elearningback.entity.Event;
import com.esprit.elearningback.repository.AvisRepo;
import com.esprit.elearningback.repository.IEventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class AvisService implements IAvisService{
    private final BadWordFilterService badWordFilterService;
    IEventRepository eventRepository;
    AvisRepo avisRepo;

    @Override
    public List<Avis> retrieveAllAvis() {
        return avisRepo.findAll();
    }

    @Override
    public Avis retrieveAvis(Long avisId) {
        return avisRepo.findById(avisId).get();
    }

    @Override
    public Avis addAvis(Avis a) {


        return avisRepo.save(a);
    }

    @Override
    public void removeAvis(Long avisId) {
        avisRepo.deleteById(avisId);
    }

    @Override
    public Avis modifyAvis(Avis avis) {
        return avisRepo.save(avis);
    }

    @Override
    @Transactional
    public Avis AvisAndAssign(Avis avis, long IdEvent) {
        Event event = eventRepository.findById(IdEvent).get();
        if (event != null ) {
            if (badWordFilterService.containsBadWord(avis.getContenu())) {
                throw new IllegalArgumentException("Comment contain inappropriate content or contains a subject that should not be posted here. Please review your post before submitting.");
            }}

        avis.setEvent(event);
        return avisRepo.save(avis);
    }

    @Override
    public List<Avis> retrieveAvisByEvent(Long eventId) {
        return avisRepo.findByEventId(eventId);
    }


}