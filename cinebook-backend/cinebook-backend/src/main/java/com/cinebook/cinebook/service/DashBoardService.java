package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.response.*;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.pl.REGON;

import java.util.List;

public interface DashBoardService {
      DashBoardResponseDto getDashBoard();

      //find the total booking of the per movie
      MovieBookingStatsDto getMostBookedMovie();
      //find the total revenue according to the movie
      MovieRevenueDto getHighestRevenueMovie();

      //find the status report of the booking  by the status of booking
      List<BookingStatusResponseDto>getBookingTotalByStatus();
      //find the status report of the booking by payment status
      List<PaymentStatusResponseDto>getBookingTotalByPaymentStatus();

}
