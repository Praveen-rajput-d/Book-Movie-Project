package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.response.*;
import com.cinebook.cinebook.serviceImpl.DashBoardImp;
import jdk.jfr.Percentage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashBoardController {
    private final DashBoardImp dashBoardService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
      public ResponseEntity<DashBoardResponseDto>getDashBoard(){
          return ResponseEntity.ok(dashBoardService.getDashBoard());
      }

      @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/most-booked-movie")
      public ResponseEntity<MovieBookingStatsDto>getMostBookedMovie(){
        return ResponseEntity.ok(dashBoardService.getMostBookedMovie());
      }

      @PreAuthorize("hasRole('ADMIN')")
      @GetMapping("/highest-revenue-movie")
      public ResponseEntity<MovieRevenueDto>getHighestRevenueofmovie(){
        return ResponseEntity.ok(dashBoardService.getHighestRevenueMovie());
      }

      @PreAuthorize("hasRole('ADMIN')")
      @GetMapping("/booking-status-report")
      public ResponseEntity<List<BookingStatusResponseDto>>getTotalBookingBystatus(){
        return ResponseEntity.ok(dashBoardService.getBookingTotalByStatus());
      }

      @PreAuthorize("hasRole('ADMIN')")
      @GetMapping("/booking-Payment-status-report")
      public ResponseEntity<List<PaymentStatusResponseDto>>getTotalBookingByPaymentStatus(){
        return ResponseEntity.ok(dashBoardService.getBookingTotalByPaymentStatus());
      }
}
