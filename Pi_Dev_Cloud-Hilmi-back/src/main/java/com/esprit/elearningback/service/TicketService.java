package com.esprit.elearningback.service;


import com.esprit.elearningback.entity.Event;
import com.esprit.elearningback.entity.Tickets;
import com.esprit.elearningback.repository.IEventRepository;
import com.esprit.elearningback.repository.TicketRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketService implements ITicketService {
    TicketRepository ticketRepository;
    IEventRepository eventRepository;
    @Override
    public Tickets addTicket(Tickets tickets) {
        return ticketRepository.save(tickets);
    }

    @Override
    public List<Tickets> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Override
    public Tickets getTicketsById(long idTickets) {
        return ticketRepository.findById(idTickets).get();
    }

    @Override
    public void deleteTickets(long idTickets) {
        ticketRepository.deleteById(idTickets);
    }

    @Override
    public Tickets updateTickets(Tickets Tickets) {
        return ticketRepository.save(Tickets);
    }

    @Override
    public Tickets AddTicketAndAssign(Tickets tickets, long IdEvent) {
        Event event = eventRepository.findById(IdEvent).get();

        tickets.setEvenement(event);
        return ticketRepository.save(tickets);
    }
    // Suppose que vous avez une méthode dans votre service TicketService pour ajouter un ticket à une réservation et à un événement
    /*public Ticket addTicketToReservationAndEvent(long ticketId, long reservationId, long eventId) {
        // Récupérer le ticket de la base de données
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new EntityNotFoundException("Ticket non trouvé avec l'ID : " + ticketId));

        // Récupérer la réservation de la base de données
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException("Réservation non trouvée avec l'ID : " + reservationId));

        // Récupérer l'événement de la base de données
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new EntityNotFoundException("Événement non trouvé avec l'ID : " + eventId));

        // Affecter le ticket à la réservation
        ticket.setReservation(reservation);

        // Affecter le ticket à l'événement
        ticket.setEvent(event);

        // Enregistrer le ticket mis à jour dans la base de données
        return ticketRepository.save(ticket);
    }*/

}
