package com.esprit.elearningback.service;


import com.esprit.elearningback.entity.Service;
import com.esprit.elearningback.entity.Subject;
import com.esprit.elearningback.repository.ServiceRepository;
import com.esprit.elearningback.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ServiceService {

    private final ServiceRepository serviceRepository;
    @Autowired
    public ServiceService(SubjectRepository subjectRepository, ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;

    }

    public List<Service> getServices() {

        return serviceRepository.findAll();

    }

    public void addNewService(Service service) {

        serviceRepository.save(service);    }

    public void updateService(Service service) {
        serviceRepository.save(service);
    }

    public void deleteServiceById(Long id) {
        serviceRepository.deleteById(id);
    }

    public List<Service> getServicesBySubjectId(Long subjectId) {
        return serviceRepository.findBySubjectId(subjectId);
    }

    public Service getServiceById(Long id) {
        return serviceRepository.findByServiceId(id);
    }

    public List<Service> getTrendingService() {
        List<Service> services = serviceRepository.findAll();
        Map<Service, Double> serviceScores = new HashMap<>();

        LocalDateTime now = LocalDateTime.now();
        for (Service service : services) {
            double score = calculateServiceScore(service, now);
            serviceScores.put(service, score);
        }

        return serviceScores.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    private double calculateServiceScore(Service service, LocalDateTime currentTime) {
        double decayFactor = 0.1;
        double score = 0.0;
            double serviceScore = service.getRatings().stream()
                    .mapToDouble(rating -> rating.getRating())
                    .average()
                    .orElse(0.0);


            LocalDateTime latestInteractionTime = service.getRatings().stream()
                    .map(rating -> rating.getTimestamp())
                    .max(LocalDateTime::compareTo)
                    .orElse(currentTime);

            long daysBetween = java.time.temporal.ChronoUnit.DAYS.between(latestInteractionTime, currentTime);
            double timeDecay = Math.exp(-decayFactor * daysBetween);

            score += serviceScore * timeDecay;

        return score;
    }

}
