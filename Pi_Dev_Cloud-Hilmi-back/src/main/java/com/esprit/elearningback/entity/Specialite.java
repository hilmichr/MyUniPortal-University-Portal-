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
@ToString
public class Specialite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    @Column(length = 5000)
    private String description;
    private String pdfFile;


    @Enumerated(EnumType.STRING)
    CategorieSpecialite categorieSpecialite;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="specialite")
    private Set<CoefOption> coefOptions = new HashSet<CoefOption>();

}