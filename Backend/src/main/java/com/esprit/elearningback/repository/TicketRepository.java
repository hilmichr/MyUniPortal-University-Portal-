package com.esprit.elearningback.repository;


import com.esprit.elearningback.entity.Tickets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Tickets,Long> {
}
