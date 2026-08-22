package com.cinebook.cinebook.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashBoardResponseDto {

    private Long totalMovies;
    private Long totalTheater;
    private Long totalScreen;
    private Long totalShows;
    private Long totalUsers;
    private Long totalBookings;
    private Long totalTickets;
    private Double totalRevenue;

     private Long todaybookings;
     private Double todayRevenue;
     private  Long todayTickets;
     private Long activeMovies;
     private Long activeShows;
     private Long activeScreen;
     private Long activeTheatre;


}
