package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Rating;
import com.esprit.elearningback.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class RatingService {
    private final RatingRepository ratingRepository;
    @Autowired
    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public List<Rating> getRatings() {

        return ratingRepository.findAll();

    }

    public void addNewRating(Rating rating) {

        ratingRepository.save(rating);    }

    public void updateRating(Rating rating) {
        ratingRepository.save(rating);
    }

    public void deleteRatingById(Long id) {
        ratingRepository.deleteById(id);
    }

    public Map<Float, Long> countServicesByRating() {
        List<Object[]> result = ratingRepository.countServicesByRating();

        // Convert the result to a Map<Float, Long>
        Map<Float, Long> countByRating = result.stream()
                .collect(Collectors.toMap(
                        arr -> (Float) arr[0],  // Rating
                        arr -> (Long) arr[1]    // Count
                ));

        // Fill in missing counts (ratings with 0 count)
        for (float i = 1; i <= 5; i++) {
            countByRating.putIfAbsent(i, 0L);
        }

        return countByRating;
    }
    public List<Rating> getByServiceId(Long id) {

        return ratingRepository.findByServiceId(id);

    }

}
