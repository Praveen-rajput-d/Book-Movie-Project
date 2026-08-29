package com.cinebook.cinebook.mapper;

import com.cinebook.cinebook.dto.response.BookingResponseDto;
import com.cinebook.cinebook.entity.Booking;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BookingMapper {
    //DTO->Entity

    public BookingResponseDto todto(Booking booking){
        BookingResponseDto dto=new BookingResponseDto();
        dto.setId(booking.getId());
        dto.setBookingNumber(booking.getBookingNumber());
        dto.setMovieName(booking.getShow().getMovie().getTitle());
        dto.setTheatreName(booking.getShow().getScreen().getTheater().getName());
        dto.setScreenName(booking.getShow().getScreen().getScreenName());
        dto.setShowDate(booking.getShow().getShowDate());
        dto.setShowTime(booking.getShow().getStartTime());
        List<String>seatNumbers=booking.getBookingSeats().stream().map(bookingSeat ->
                bookingSeat.getSeat().getSeatNumber())
                .collect(Collectors.toList());
        dto.setSeatNumbers(seatNumbers);
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setBookingStatus(booking.getBookingStatus());
   if(booking.getTicket()!=null){
       dto.setTicketId(booking.getTicket().getId());
   }

        return  dto;
    }
}
