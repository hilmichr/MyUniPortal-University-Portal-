package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.RendezVous;
import com.esprit.elearningback.entity.User;
import com.esprit.elearningback.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class RendezVousService {
    @Autowired
    private RendezVousRepository rendezVousRepository;

    @Autowired
    private UserServiceImpl userService;

    public RendezVous saveRendezVous(RendezVous rendezVous){
        return rendezVousRepository.save(rendezVous);
    }



    public RendezVous getRendezVousById(Long id){
        return rendezVousRepository.findById(id).orElseThrow(() -> new RuntimeException("RendezVous non trouvé"));
    }
}
