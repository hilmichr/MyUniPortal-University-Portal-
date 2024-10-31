package com.esprit.elearningback.service;



import com.esprit.elearningback.entity.Tickets;

import java.util.List;

public interface ITicketService {
    Tickets addTicket(Tickets tickets);
    List<Tickets> getAllTickets();
    Tickets getTicketsById(long idTickets);
    void deleteTickets(long idTickets);
    Tickets updateTickets(Tickets Tickets);
    Tickets AddTicketAndAssign(Tickets tickets, long IdEvent);
}
