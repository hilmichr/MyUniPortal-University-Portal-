package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Ressources;
import com.esprit.elearningback.entity.Service;
import com.esprit.elearningback.entity.Subject;
import com.esprit.elearningback.repository.RessourcesRepository;
import com.esprit.elearningback.repository.ServiceRepository;
import com.esprit.elearningback.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Component
public class RessourcesService {

    @Autowired
    private RessourcesRepository ressourcesRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    public Ressources uploadImage(Ressources ressources, Long serviceId){
        Service service = serviceRepository.findById(serviceId).orElse(null);
        ressources.setService(service);
        return ressourcesRepository.save(ressources);
    }

//    public byte[] downloadImage(String ressourceName) {
//        Ressources dbImageData = ressourcesRepository.findByRessourceName(ressourceName);
//        if (dbImageData != null) {
//            return FileUtils.decompressImage(dbImageData.getFileData());
//        }
//        return null;
//    }

    public List<Ressources> getRessourcesByService(Long serviceId) {
        return ressourcesRepository.getRessourcesByService(serviceId);
    }

    public List<Ressources> getAllRessources() {
        return ressourcesRepository.findAll();
    }
    public void deleteRessource(Long id) {
        ressourcesRepository.deleteById(id);
    }
}