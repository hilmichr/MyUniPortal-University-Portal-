package com.esprit.elearningback.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = "reservations")
@NamedEntityGraph(name = "Evenement.detail", attributeNodes = @NamedAttributeNode("reservations"))
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private int nbrPlace;
    private LocalDate date_deb;
    private LocalDate date_fin;
    private String lieu;
    private String type;
    private String image;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reservation> reservations;

    @OneToMany(mappedBy = "evenement", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Tickets> tickets;

    @OneToOne
    private Image imagecloud;


    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Avis> avis;


}
