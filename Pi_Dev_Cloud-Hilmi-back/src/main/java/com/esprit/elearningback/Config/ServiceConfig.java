package com.esprit.elearningback.Config;

import com.esprit.elearningback.repository.ServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfig {

    @Bean
    CommandLineRunner commandLineRunnerService(ServiceRepository repositoryServiceConfig){
        return args -> {};
    }
}
