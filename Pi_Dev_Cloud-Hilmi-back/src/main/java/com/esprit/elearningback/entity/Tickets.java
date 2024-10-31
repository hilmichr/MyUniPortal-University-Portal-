package com.esprit.elearningback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Tickets  {
    @Id
    @GeneratedValue
    private Long id;
    private Long nbr_ticket;
    private String type;
    private Long numero;
    private int prix;
    @ManyToOne
    private Event evenement;


}
