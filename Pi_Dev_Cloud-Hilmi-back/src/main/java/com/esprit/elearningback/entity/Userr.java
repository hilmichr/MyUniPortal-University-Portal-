package com.esprit.elearningback.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Userr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Other user attributes

    @OneToMany(mappedBy = "userr")
    @JsonIgnore
    private List<Reservation> reservations;


    // Getters and setters
}
