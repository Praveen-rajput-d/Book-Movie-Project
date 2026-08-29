package com.cinebook.cinebook.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "movies")
@Getter
@Setter
@Builder

public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,length = 255)
    private  String title;
    @Column(columnDefinition = "TEXT")
    private  String description;
    @Column(nullable = false,length = 100)
    private String genre;
    @Column(nullable = false,length = 55)
    private String language;
    @Column(nullable = false)
    private Integer duration;
    @Column(name = "release_date")
    private LocalDate releaseDate;
    @Column(name = "poster_url")
    private String posterUrl;
    @Column(name = "trailer_url")
    private String trailerUrl;

    private Double rating;

    private Boolean isActive=true;

    @Column(name = "created_at")
    private LocalDateTime CreatedAt;

    @Column(name = "Updated_at")
    private LocalDateTime updatedAt;
}
