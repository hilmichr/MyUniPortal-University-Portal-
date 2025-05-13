package com.esprit.elearningback.Config;

import com.esprit.elearningback.repository.SubjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SubjectConfig {

    @Bean
    CommandLineRunner commandLineRunnerSubject(SubjectRepository repositorySubjectConfig){
        return args -> {};
    }
}
