package com.esprit.elearningback.controller;


import com.esprit.elearningback.entity.Avis;
import com.esprit.elearningback.service.IAvisService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/Avis")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AvisController {

    IAvisService avisService;


    @GetMapping("/retrieve-all-avis")
    public List<Avis> getAvis(){
        List<Avis> listAviss = avisService.retrieveAllAvis();
        return listAviss;
    }
    @GetMapping("/retrieve-avis/{idAvis}")
    public Avis retrieveAvis(@PathVariable("idAvis") Long avisId) {
        Avis avis = avisService.retrieveAvis(avisId);
        return avis;
    }

    @GetMapping("/retrieve-avis-by-event/{idEvent}")
    public List<Avis> retrieveAvisByEvent(@PathVariable("idEvent") Long idEvent) {
        List<Avis> avis = avisService.retrieveAvisByEvent(idEvent);
        return avis;
    }


    @PostMapping("/add-avis")
    public Avis addAvis(@RequestBody Avis e) {
        Avis avis = avisService.addAvis(e);
        return avis;
    }

    @PostMapping("/assign/{idEvent}")
    public Avis AvisAndAssign(@RequestBody Avis avis, @PathVariable("idEvent") long idEvent) {
        return avisService.AvisAndAssign(avis, idEvent);
    }

    @DeleteMapping("/remove-avis/{avis-id}")
    public void removeChambre(@PathVariable("avis-id") Long avisId) {
        avisService.removeAvis(avisId);
    }

    @PutMapping("/modify-avis")
    public Avis modifyavis(@RequestBody Avis e) {
        Avis avis  = avisService.modifyAvis(e);
        return avis;

    }



}