package com.cinebook.cinebook.dto.response;

import com.cinebook.cinebook.entity.Movie;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class MovieBookingStatsDto {
    private String movieName;
    private Long totalBookings;
}
