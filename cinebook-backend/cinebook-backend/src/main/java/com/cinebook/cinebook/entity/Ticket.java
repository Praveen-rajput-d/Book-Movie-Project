package com.cinebook.cinebook.entity;

import com.cinebook.cinebook.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private  String ticketNumber;
    @OneToOne
    @JoinColumn(name = "bookingId",nullable = false)
    private  Booking booking;
    @Enumerated(EnumType.STRING)
    private TicketStatus ticketStatus;
    private LocalDateTime generatedAt;


}
