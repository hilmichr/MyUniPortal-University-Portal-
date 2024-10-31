package com.esprit.elearningback.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CoefOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    //String nom;
    int coefficient;

    @ManyToOne
    @JsonIgnore
    Specialite specialite;
    @ManyToOne
    UniteEnseignement uniteEnseignement;
}
