package com.securetrack.service;

import com.securetrack.entity.Status;
import com.securetrack.entity.Ticket;

import java.util.List;

public interface TicketService {
    Ticket createTicket(Ticket ticket, Long reporterId);

    List<Ticket> getAllTickets();

    Ticket getTicketById(Long id);

    Ticket updateTicketStatus(Long id, Status status);

    void deleteTicket(Long id);
}
