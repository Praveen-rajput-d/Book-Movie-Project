package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.request.BookingRequestDto;
import com.cinebook.cinebook.dto.response.BookingResponseDto;
import com.cinebook.cinebook.dto.response.MovieResponseDto;
import com.cinebook.cinebook.dto.response.MovieRevenueDto;
import com.cinebook.cinebook.entity.Booking;
import com.cinebook.cinebook.entity.BookingSeat;
import com.cinebook.cinebook.enums.BookingStatus;
import com.cinebook.cinebook.enums.SeatType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface BookingService {
    BookingResponseDto createBooking(BookingRequestDto request);
   Page<BookingResponseDto> getAllBookings(int page,int size,String sortBy,String sortDir);
    BookingResponseDto getBookingById(Long bookingId);
      List<BookingResponseDto>searchByBookingNumber(String BookingNumber);
      List<BookingResponseDto>searchByStatus(BookingStatus bookingStatus);

      List<BookingResponseDto> getMyBookings();
      void cancelBooking(Long bookingId);


}
