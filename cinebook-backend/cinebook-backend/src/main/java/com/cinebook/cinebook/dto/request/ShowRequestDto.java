package com.cinebook.cinebook.dto.request;

import com.cinebook.cinebook.entity.Movie;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShowRequestDto {
    @NotNull(message = "show date is required")
    private LocalDate showDate;
    @NotNull(message = "Start time is requied")
    private LocalTime startTime;
    @NotNull(message = "end time is required")
    private LocalTime endTime;
    @NotNull(message = "Ticket price is required")
    @DecimalMin(value = "1.0")
    private BigDecimal ticketPrice;

    @NotNull(message = "Available seats is required")
    @Min(1)
    private  Integer availableSeats;

    @NotNull(message = "Movie id is required")
    private Long movieId;
    @NotNull(message = "screen id is required")
    private Long screenId;

    @NotNull(message = "Active state  is required")
    private Boolean isActive;


}
