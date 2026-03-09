package com.securetrack.service;

import com.securetrack.entity.Status;
import com.securetrack.entity.Ticket;
import com.securetrack.entity.User;
import com.securetrack.exception.ResourceNotFoundException;
import com.securetrack.repository.TicketRepository;
import com.securetrack.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketServiceImpl(TicketRepository ticketRepository, UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Ticket createTicket(Ticket ticket, Long reporterId) {
        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + reporterId));

        ticket.setReporter(reporter);
        if (ticket.getStatus() == null) {
            ticket.setStatus(Status.OPEN);
        }
        return ticketRepository.save(ticket);
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Override
    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
    }

    @Override
    public Ticket updateTicketStatus(Long id, Status status) {
        Ticket ticket = getTicketById(id);
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }

    @Override
    public void deleteTicket(Long id) {
        Ticket ticket = getTicketById(id);
        ticketRepository.delete(ticket);
    }
}
