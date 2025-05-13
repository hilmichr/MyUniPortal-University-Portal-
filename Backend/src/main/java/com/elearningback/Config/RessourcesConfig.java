package com.esprit.elearningback.Config;

import com.esprit.elearningback.repository.RessourcesRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RessourcesConfig {

    @Bean
    CommandLineRunner commandLineRunnerRessources(RessourcesRepository repositoryRessourcesConfig){
        return args -> {
            System.out.println("RessourcesRepository is ready!");

        };
    }
}
