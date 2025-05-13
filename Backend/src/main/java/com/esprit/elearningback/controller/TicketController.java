package com.esprit.elearningback.controller;


import com.esprit.elearningback.entity.Tickets;
import com.esprit.elearningback.service.ITicketService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("api/ticket")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TicketController {
    ITicketService ticketService;

    @PostMapping("/add")
    public Tickets addTicket(@RequestBody Tickets ticket){
        return ticketService.addTicket(ticket);
    }

    @PostMapping("/assign/{idEvent}")
    public Tickets AddTicketAndAssign(@RequestBody Tickets tickets, @PathVariable("idEvent") long idEvent) {
        return ticketService.AddTicketAndAssign(tickets, idEvent);
    }

    // Order 2
    @GetMapping("/getAll")
    public List<Tickets> getAllTickets(){
        return ticketService.getAllTickets();
    }

    // Order 3
    @GetMapping("/get")
    public Tickets getTicket(@RequestParam("idTicket") long idTicket){
        return ticketService.getTicketsById(idTicket);
    }

    // Order 4
    @DeleteMapping("/delete/{idTicket}")
    public void deleteTicket(@PathVariable("idTicket") long idTicket){
        ticketService.deleteTickets(idTicket);
    }

    // Order 5
    @PutMapping("/update")
    public Tickets updateTicket(@RequestBody Tickets ticket){
        return ticketService.updateTickets(ticket);
    }
}
