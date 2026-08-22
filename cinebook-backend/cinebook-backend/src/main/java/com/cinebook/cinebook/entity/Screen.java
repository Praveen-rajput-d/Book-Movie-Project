package com.cinebook.cinebook.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.http.StreamingHttpOutputMessage;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Screens")
@Entity
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,length = 50)
    private String screenName;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private Boolean isActive;
    @Column(nullable = false)
    private String screenType;

    @Column(updatable = false)
    private LocalDateTime createAt;

    private LocalDateTime updatedAt;

    //many screens has only one theater
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theater_id",nullable = false)
    private Theater theater;

    @PrePersist
    public void prePersist(){
        createAt=LocalDateTime.now();
        updatedAt=LocalDateTime.now();
    }
    @PreUpdate
    public void preUpdate(){
        updatedAt=LocalDateTime.now();
    }

}
