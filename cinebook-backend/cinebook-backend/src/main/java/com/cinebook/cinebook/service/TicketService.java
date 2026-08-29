package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.response.TicketResponseDto;
import com.cinebook.cinebook.repository.TicketRepository;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface TicketService {
    TicketResponseDto getTicketById(Long id);
    TicketResponseDto getTicketByticketNumber(String ticketNumber);
    TicketResponseDto getTicketByBooking(Long bookingId);
    List<TicketResponseDto> getActiveTickets();
    Page<TicketResponseDto>getAllTickets(int page, int size, String sortBy,String sortDir);

    //search tickets
    //by movieId
    List<TicketResponseDto>getTicketsByMovie(Long movieId);
    //by theatre id
    List<TicketResponseDto>getTicketsByTheatre(Long theatreId);
    //by show date
    List<TicketResponseDto>getTicketsByshowDate(LocalDate showDate);
    List<TicketResponseDto>getMyTickets();


    List<TicketResponseDto>allTickets();
}
