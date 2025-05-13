package com.esprit.elearningback.service;


import com.esprit.elearningback.entity.Rating;
import com.esprit.elearningback.entity.Service;
import com.esprit.elearningback.entity.Subject;
import com.esprit.elearningback.repository.RatingRepository;
import com.esprit.elearningback.repository.ServiceRepository;
import com.esprit.elearningback.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class SubjectService {

    private final SubjectRepository subjectRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public List<Subject> getSubjects() {

        return subjectRepository.findAll();

    }

    public void addNewSubject(Subject subject) {

        subjectRepository.save(subject);    }

    public void updateSubject(Subject subject) {
        subjectRepository.save(subject);
    }

    public void deleteSubjectById(Long id) {
        subjectRepository.deleteById(id);
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findBySubjectId(id);
    }
    public List<Subject> getTrendingSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        Map<Subject, Double> subjectScores = new HashMap<>();

        LocalDateTime now = LocalDateTime.now();
        for (Subject subject : subjects) {
            double score = calculateSubjectScore(subject, now);
            subjectScores.put(subject, score);
        }

        return subjectScores.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }


    private double calculateSubjectScore(Subject subject, LocalDateTime currentTime) {
        double decayFactor = 0.1;
        double score = 0.0;

        for (Service service : subject.getServices()) {
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
        }

        return score;
    }
    //generate random 20 service for testing trending:
    public void generateSampleSubjects() {
        Random random = new Random();
        for (int i = 1; i <= 20; i++) {
            Subject subject = new Subject();
            subject.setSubjectName("Subject " + i);
            subjectRepository.save(subject);  // Save Subject before creating Services

            for (int j = 1; j <= 3; j++) {
                Service service = new Service();
                service.setServiceName("Service " + j + " for Subject " + i);
                service.setSubject(subject);

                List<Rating> ratings = new ArrayList<>();
                for (int k = 1; k <= 5; k++) {
                    Rating rating = new Rating();
                    rating.setRating(random.nextFloat() * 5);
                    rating.setTimestamp(LocalDateTime.now().minusDays(random.nextInt(30)));
                    rating.setService(service);
                    ratings.add(rating);
                }
                serviceRepository.save(service);
                ratingRepository.saveAll(ratings);
            }
        }
    }

}
