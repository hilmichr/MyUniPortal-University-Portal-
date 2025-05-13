package com.esprit.elearningback.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "ressources")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ressources {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRessources;
    @Column(name = "ressource_name")
    private String ressourceName;
    private String ressourceType;

    private String ressourceUrl;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = true)
    private Service service;

    // Getters and setters

}