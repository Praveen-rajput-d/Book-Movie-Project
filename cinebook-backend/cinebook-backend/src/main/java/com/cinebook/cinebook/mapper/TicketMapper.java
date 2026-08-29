package com.cinebook.cinebook.mapper;

import com.cinebook.cinebook.dto.response.TicketResponseDto;
import com.cinebook.cinebook.entity.BookingSeat;
import com.cinebook.cinebook.entity.Ticket;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class TicketMapper {
    public TicketResponseDto todto(Ticket ticket){
        return TicketResponseDto.builder()
                .id(ticket.getId())
                .ticketNumber(ticket.getTicketNumber())

                .bookingNumber(ticket.getBooking().getBookingNumber())
                .movieName(ticket.getBooking().getShow().getMovie().getTitle())
                .theatreName(ticket.getBooking().getShow().getScreen().getTheater().getName())
                .screenName(ticket.getBooking().getShow().getScreen().getScreenName())
                .showDate(ticket.getBooking().getShow().getShowDate())
                .showTime(ticket.getBooking().getShow().getStartTime())
                .seatNumbers(ticket.getBooking().getBookingSeats().stream()
                        .map(BookingSeat::getSeat)
                        .map(seat -> seat.getSeatNumber())
                        .collect(Collectors.toList()))
                .totalAmount(ticket.getBooking().getTotalAmount())
                .ticketStatus(ticket.getTicketStatus())
                .qrCode(ticket.getQrCode())
                .generatedAt(ticket.getGeneratedAt())
                .build();
    }
}
