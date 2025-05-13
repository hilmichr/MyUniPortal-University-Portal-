package com.esprit.elearningback.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "rating")
@Getter
@Setter
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRating;
    private LocalDateTime timestamp;
    private String comment;

    private float rating;




    @ManyToOne
    @JoinColumn(name = "id_service" , nullable = true)
    private Service service;





    public void setRatingid(Long id) {
        idRating=id;
    }

    // Constructors, getters, and setters can be added here if needed
}