package com.cinebook.cinebook.entity;

import com.cinebook.cinebook.enums.BookingSeatStatus;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity()
@Table(name = "booking_seats")
public class BookingSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id",nullable = false)
     private  Booking booking;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_id",nullable = false)
    private Seat seat;
    @Column(nullable = false)
    private Double price;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingSeatStatus bookingSeatStatus;
}
