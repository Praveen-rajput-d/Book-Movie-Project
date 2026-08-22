package com.cinebook.cinebook.entity;

import com.cinebook.cinebook.enums.SeatType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.sql.results.graph.Fetch;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seats")
@Builder
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String seatNumber;//A1 B10,C32
    @Column(nullable = false)
    private String seatRow;//A,B,C
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeatType seatType;
    @Column(nullable = false)
    private boolean isActive=true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screenId",nullable = false)
    private Screen screen;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
     public void prePersist(){
         createdAt=LocalDateTime.now();
         updatedAt=LocalDateTime.now();

     }
     @PreUpdate
     public void preUpdate(){
        updatedAt=LocalDateTime.now();
     }


}
