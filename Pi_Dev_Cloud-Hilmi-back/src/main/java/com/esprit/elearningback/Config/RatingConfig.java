package com.esprit.elearningback.Config;

import com.esprit.elearningback.repository.RatingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

public class RatingConfig {

    @Bean
    CommandLineRunner commandLineRunnerRessources(RatingRepository repositoryRatingConfig){
        return args -> {
            System.out.println("RatingRepository is ready!");

        };
    }

}
