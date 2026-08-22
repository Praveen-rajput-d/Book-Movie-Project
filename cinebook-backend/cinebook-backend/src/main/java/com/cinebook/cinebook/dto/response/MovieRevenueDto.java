package com.cinebook.cinebook.dto.response;

import com.cinebook.cinebook.entity.Movie;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieRevenueDto {
    private String movieName;
    private Double totalRevenue;
}
