package com.cinebook.cinebook.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "shows")
public class Show {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
    @Column(nullable = false)
    private LocalDate showDate;
    @Column(nullable = false)
    private LocalTime startTime;
    @Column(nullable = false)
    private LocalTime endTime;
    @Column(nullable = false)
    private BigDecimal ticketPrice;
    @Column(nullable = false)
    private Integer availableSeats;
    @Column(nullable = false)
    private  Boolean isActive=true;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "movie_id",nullable = false)
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "screen_id",nullable = false)
    private Screen screen;
    @PrePersist
    public void prePersist(){
        createdAt=LocalDateTime.now();
        updatedAt=LocalDateTime.now();

        if(isActive==null){
            isActive=true;
        }
    }

    @PreUpdate
    public void preUpdate(){
        updatedAt=LocalDateTime.now();
    }

}
