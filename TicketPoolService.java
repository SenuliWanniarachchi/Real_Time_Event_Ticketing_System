package com.java.Coursework01.service;

import com.java.Coursework01.model.TicketPool;
import com.java.Coursework01.repository.TicketPoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketPoolService {

    private final TicketPoolRepository ticketPoolRepository;

    @Autowired
    public TicketPoolService(TicketPoolRepository ticketPoolRepository) {
        this.ticketPoolRepository = ticketPoolRepository;
    }

    public void addTickets(int quantity) {
        TicketPool ticketPool = ticketPoolRepository.findById(1L).orElseThrow(() -> new IllegalStateException("Ticket pool not found"));
        ticketPool.addTickets(quantity);
        ticketPoolRepository.save(ticketPool);
    }

    public String removeTicket() {
        TicketPool ticketPool = ticketPoolRepository.findById(1L).orElseThrow(() -> new IllegalStateException("Ticket pool not found"));
        return ticketPool.removeTicket();
    }

    public TicketPool getTicketPool() {
        return ticketPoolRepository.findById(1L).orElseThrow(() -> new IllegalStateException("Ticket pool not found"));
    }
}
