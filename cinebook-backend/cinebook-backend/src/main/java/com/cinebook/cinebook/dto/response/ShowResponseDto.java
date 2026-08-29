package com.cinebook.cinebook.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class ShowResponseDto {
    private  Long id;
    private LocalDate showDate;
    private LocalTime startTime;
    private  LocalTime endTime;
    private Integer availableSeats;
    private  Boolean isActive;
    private  BigDecimal ticketPrice;
    private Long movieId;
     private  String movieName;
     private  Long screenId;
     private  String screenName;
     private LocalDateTime cratedAt;
     private  LocalDateTime updatedAt;
     private Long theaterId;
     private String theaterName;





}
