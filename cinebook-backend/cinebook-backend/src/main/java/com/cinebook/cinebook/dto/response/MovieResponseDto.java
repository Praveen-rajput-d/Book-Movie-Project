package com.cinebook.cinebook.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MovieResponseDto {
    private long id;
    private String title;
    private String description;
    private String genre;
    private String language;
    private Integer duration;

    private LocalDate releaseDate;
    private  String posterUrl;
    private String trailerUrl;
    private Double rating;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
