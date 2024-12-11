package com.java.Coursework01.controller;

import com.java.Coursework01.model.TicketPool;
import com.java.Coursework01.service.TicketPoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ticket-pool")
public class TicketPoolController {

    private final TicketPoolService ticketPoolService;

    @Autowired
    public TicketPoolController(TicketPoolService ticketPoolService) {
        this.ticketPoolService = ticketPoolService;
    }

    @PostMapping("/add-tickets")
    public String addTickets(@RequestParam int quantity) {
        try {
            ticketPoolService.addTickets(quantity);
            return "Tickets added successfully!";
        } catch (IllegalStateException e) {
            return e.getMessage();
        }
    }

    @GetMapping("/remove-ticket")
    public String removeTicket() {
        try {
            return ticketPoolService.removeTicket();
        } catch (IllegalStateException e) {
            return e.getMessage();
        }
    }

    @GetMapping
    public TicketPool getTicketPool() {
        return ticketPoolService.getTicketPool();
    }
}
