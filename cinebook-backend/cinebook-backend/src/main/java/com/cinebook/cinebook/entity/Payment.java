package com.cinebook.cinebook.entity;

import com.cinebook.cinebook.enums.PaymentMethod;
import com.cinebook.cinebook.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @OneToOne
    @JoinColumn(name = "bookingId",nullable = false)
    private Booking booking;
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    @Column(nullable = false,unique = true)
    private  String transactionId;
    @Column(nullable = false)
    private Double amount;
    @Column(nullable = false)
    private LocalDateTime paymentTime;


}
