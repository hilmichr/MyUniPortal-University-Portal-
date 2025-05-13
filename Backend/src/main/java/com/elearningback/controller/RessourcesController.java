package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Ressources;
import com.esprit.elearningback.entity.Service;
import com.esprit.elearningback.service.ImageService;
import com.esprit.elearningback.service.RessourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/ressources")
@CrossOrigin(origins = "*")
public class RessourcesController {

    @Autowired
    private RessourcesService ressourcesservice;
    @Autowired
    private ImageService imageService;
    @PostMapping("/uploadimage")
    @Transactional
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("serviceId") long serviceId){
        try {
            Ressources ressources = new Ressources();
            ressources.setRessourceUrl(imageService.uploadBlogImage(file));
            ressources.setRessourceType(file.getContentType());
            ressources.setRessourceName(file.getOriginalFilename());
            Ressources uploadImage = ressourcesservice.uploadImage(ressources,serviceId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(uploadImage);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @GetMapping("/getimagebyname/{fileName}")
//    @Transactional
//    public ResponseEntity<?> downloadImage(@PathVariable String fileName) {
//        byte[] imageData = service.downloadImage(fileName);
//        if (imageData != null) {
//            return ResponseEntity.status(HttpStatus.OK)
//                    .contentType(MediaType.IMAGE_PNG)
//                    .body(imageData);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body("Image not found");
//        }
//    }

    @GetMapping("/getressourcesbyservice/{serviceId}")
    @Transactional
    public ResponseEntity<List<Ressources>> getRessourcesByService(@PathVariable long serviceId) {
        List<Ressources> ressourcesList = ressourcesservice.getRessourcesByService(serviceId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ressourcesList);
    }

    @GetMapping("/getallressource")
    @Transactional
    public ResponseEntity<List<Ressources>> getAllRessources() {
        List<Ressources> ressourcesList = ressourcesservice.getAllRessources();
        return ResponseEntity.status(HttpStatus.OK)
                .body(ressourcesList);
    }

    @DeleteMapping("/deleteressource/{ressourceId}")
    @Transactional
    public ResponseEntity<?> deleteRessource(@PathVariable("ressourceId") long ressourceId) {
        ressourcesservice.deleteRessource(ressourceId);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}