package com.esprit.elearningback.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UniteEnseignement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String nom;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy="uniteEnseignement")
    private Set<CoefOption> CoefOptions = new HashSet<>();
}
