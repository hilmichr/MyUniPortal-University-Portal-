package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Article;
import com.esprit.elearningback.entity.Specialite;
import com.esprit.elearningback.service.ICoefOptionService;
import com.esprit.elearningback.service.ISpecialiteService;
import com.esprit.elearningback.service.IUniteEnseignementService;
import com.esprit.elearningback.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/specialite")
@CrossOrigin("*")
public class SpecialiteRestController {
    ICoefOptionService coefOptionService;
    ISpecialiteService specialiteService;
    IUniteEnseignementService uniteEnseignementService;
    ImageService imageService;

    @GetMapping
    public List<Specialite> getSpecialites() {
        return specialiteService.retrieveAllSpecialites();
    }

    @GetMapping("/{Specialite-id}")
    public Specialite retrieveSpecialite(@PathVariable("Specialite-id") Long SpecialiteId) {
        return specialiteService.retrieveSpecialite(SpecialiteId);
    }

    @CrossOrigin("*")
    @PostMapping
    public ResponseEntity<?> addSpecialite(@RequestParam("specialite") String specialiteJson, @RequestParam("PDF") MultipartFile PDF) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Specialite specialite = mapper.readValue(specialiteJson, Specialite.class);
            specialite.setPdfFile(imageService.uploadBlogImage(PDF));
            Specialite createdSpecialite = specialiteService.addSpecialite(specialite);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSpecialite);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/remove/{Specialite-id}")
    public void removeSpecialite(@PathVariable("Specialite-id") Long chId) {
        specialiteService.removeSpecialite(chId);
    }

    @CrossOrigin("*")
    @PutMapping("/modify")
    public ResponseEntity<?> modifySpecialite(@RequestBody Specialite specialite) {
        try {
            Specialite createdSpecialite = specialiteService.modifySpecialite(specialite);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSpecialite);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/calcule-score")
    public ResponseEntity<?> calculeScore(@RequestBody Map<Long, Double> moyParUE ,@RequestParam("moyenneGeneral") Double moyenneGeneral) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(specialiteService.calculeScore(moyParUE,moyenneGeneral));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

