package com.esprit.elearningback.controller;


import com.esprit.elearningback.entity.UniteEnseignement;
import com.esprit.elearningback.service.IUniteEnseignementService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/uniteEnseignement")
@CrossOrigin("*")
public class UniteEnseignementRestController {
    IUniteEnseignementService uniteEnseignementService;

    // this is the crud for the UniteEnseignement class
    @GetMapping
    public List<UniteEnseignement> retrieveAllUes() {
        return uniteEnseignementService.retrieveAllUes();
    }

    @GetMapping("/{ue-id}")
    public UniteEnseignement retrieveUe(@PathVariable("ue-id") Long chId) {
        return uniteEnseignementService.retrieveUe(chId);
    }


    @PostMapping
    public UniteEnseignement addUe(@RequestBody UniteEnseignement ue) {
        return uniteEnseignementService.addUe(ue);
    }

    @DeleteMapping("/remove/{ue-id}")
    public void removeUe(@PathVariable("ue-id") Long chId) {
        uniteEnseignementService.removeUe(chId);
    }


    @PutMapping("/modify")
    public UniteEnseignement modifyUe(@RequestBody UniteEnseignement c) {
        return uniteEnseignementService.modifyUe(c);
    }
}
