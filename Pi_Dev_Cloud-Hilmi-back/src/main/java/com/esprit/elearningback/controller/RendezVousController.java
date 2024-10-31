package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Avis;
import com.esprit.elearningback.entity.RendezVous;
import com.esprit.elearningback.service.RendezVousService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/rendezvous")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RendezVousController {

    RendezVousService rendezVousService;

    @PostMapping("/add-rendez-vous")
    public RendezVous addRendezVous(@RequestBody RendezVous rendezVous) {
        RendezVous  rendezVous1= rendezVousService.saveRendezVous(rendezVous);
        return rendezVous1;
    }

    @GetMapping("/retrieve-rendezvous/{id}")
    public RendezVous retrieveAvis(@PathVariable("id") Long id) {
        RendezVous rendezVous = rendezVousService.getRendezVousById(id);
        return rendezVous;
    }
}
