package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Rating;
import com.esprit.elearningback.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path= "api/v1/rating")
@CrossOrigin(origins = "*")
public class RatingController {

    private final RatingService ratingService;
    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;

    }


    @GetMapping("/list-ratings")
    public List<Rating> getRating(){
        return ratingService.getRatings();
    }

    @PostMapping
    public void addNewRating(@RequestBody Rating rating)
    {
        ratingService.addNewRating(rating);
    }

    @PutMapping("/{id}")
    public void updateRating(@PathVariable("id") Long id, @RequestBody Rating rating) {
        rating.setRatingid(id); // Ensure the ID is set for the update operation
        ratingService.updateRating(rating);
    }

    @DeleteMapping("/{id}")
    public void deleteRating(@PathVariable Long id) {
        ratingService.deleteRatingById(id);
    }

    @GetMapping("/count-by-rating")
    public Map<Float, Long> countServicesByRating() {
        return ratingService.countServicesByRating();
    }

    @GetMapping("/rating-by-service/{id}")
    public List<Rating> getByServiceId(@PathVariable Long id) {
        return ratingService.getByServiceId(id);
    }

}
