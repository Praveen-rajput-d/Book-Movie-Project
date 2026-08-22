package com.cinebook.cinebook.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.sql.results.internal.StandardEntityGraphTraversalStateImpl;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MovieRequestDto {
    @NotBlank(message = "Title of movie is required")
    private String title;
    @NotBlank(message = "Description is required")
    private String description;
    @NotBlank(message = "Genre  is required")
    private String genre;
    @NotBlank(message = "Language is required")
    private String language;
    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be greater than 0")
    private Integer duration;

    @NotNull(message = "Release Date Is required")
    private LocalDate releaseDate;

    private String posterUrl;
    private String trailerUrl;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "10.0")
    private Double rating;

    private Boolean active;

}
