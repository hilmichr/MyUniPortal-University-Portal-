package com.esprit.elearningback.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = "event")

public class Reservation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date_reser;
    private String nom_reserv;

    @ManyToOne
    private Event event;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Userr userr;



}
