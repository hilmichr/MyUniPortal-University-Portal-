package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Article;
import com.esprit.elearningback.entity.Service;
import com.esprit.elearningback.entity.Subject;
import com.esprit.elearningback.service.ImageService;
import com.esprit.elearningback.service.ServiceService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path= "api/v1/service")
@CrossOrigin(origins = "*")
public class ServiceController {

    @Autowired
    ImageService imageService;

    private final ServiceService serviceService;
    @Autowired
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;

    }


    @GetMapping("/listservices")
    public List<Service> getService(){
        return serviceService.getServices();
    }

    @PostMapping("/addservice")
    public void addService(
            @RequestParam("service") String serviceJson,
            @RequestParam("serviceImage") MultipartFile serviceImage
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Service service = mapper.readValue(serviceJson, Service.class);

            service.setImageUrl(imageService.uploadBlogImage(serviceImage));
            serviceService.addNewService(service);
        } catch (Exception e) {
        }
    }

    @PutMapping("/updateservice/{id}")
    public void updateSubject(@PathVariable("id") Long id, @RequestBody Service updatedService) {
        Service existingService = serviceService.getServiceById(id);
        if (existingService != null) {
            // Keep the existing subject unchanged
            updatedService.setSubject(existingService.getSubject());

            // Set the ID to ensure it matches the existing service
            updatedService.setServiceId(id);

            serviceService.updateService(updatedService);
        }
    }

    @DeleteMapping("/deleteservice/{id}")
    public void deleteService(@PathVariable Long id) {
        serviceService.deleteServiceById(id);
    }

    @GetMapping("getservicesbysubjectid/{subjectId}")
    public List<Service> getServicesBySubjectId(@PathVariable Long subjectId) {
        return serviceService.getServicesBySubjectId(subjectId);
    }

    @GetMapping("/getservicebyid/{id}")
    public ResponseEntity<Service> findServiceById(@PathVariable Long id) {
        Service service = serviceService.getServiceById(id);
        return ResponseEntity.ok(service);
    }

    @GetMapping("/trending")
    public List<Service> getTrendingService(){
        return serviceService.getTrendingService();
    }

}
