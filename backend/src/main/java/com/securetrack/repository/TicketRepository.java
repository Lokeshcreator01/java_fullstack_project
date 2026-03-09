package com.securetrack.repository;

import com.securetrack.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByReporterId(Long reporterId);

    List<Ticket> findByStatus(com.securetrack.entity.Status status);
}
