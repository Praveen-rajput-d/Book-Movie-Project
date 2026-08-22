package com.cinebook.cinebook.entity;

import com.cinebook.cinebook.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "booking")
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,unique = true)
    private String bookingNumber;
    @Column(nullable = false)
    private LocalDateTime bookingTime;
    @Column(nullable = false)
    private Double totalAmount;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus bookingStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_id",nullable = false)
    private Show show;

    //one booking has many BookingSeats
    @OneToMany(mappedBy = "booking",
    cascade = CascadeType.ALL,
    orphanRemoval = true)
     private List<BookingSeat>bookingSeats=new ArrayList<>();

    @Column(nullable = false)
    private  LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @OneToOne(mappedBy = "booking",cascade = CascadeType.ALL)
    private Payment payment;

    @PrePersist
    public void prePersist(){
        createdAt=LocalDateTime.now();
        updatedAt=LocalDateTime.now();
        if(bookingTime==null){
            bookingTime=LocalDateTime.now();
        }
        if(bookingStatus==null){
            bookingStatus=BookingStatus.PENDING;
        }
    }
    @PreUpdate
    public void preUpdate(){
        updatedAt=LocalDateTime.now();
    }
}
