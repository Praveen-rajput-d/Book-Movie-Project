package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.response.TicketResponseDto;
import com.cinebook.cinebook.entity.Ticket;
import com.cinebook.cinebook.enums.TicketStatus;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.mapper.TicketMapper;
import com.cinebook.cinebook.repository.TicketRepository;
import com.cinebook.cinebook.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketServiceImp  implements TicketService {
    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;

    @Override
    public TicketResponseDto getTicketById(Long id) {
        Ticket ticket=ticketRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Ticket Not Found with this:"+id));

        return ticketMapper.todto(ticket) ;
    }

    @Override
    public TicketResponseDto getTicketByticketNumber(String ticketNumber) {
        Ticket ticket=ticketRepository.findByTicketNumber(ticketNumber).orElseThrow(()->new ResourceNotFoundException("TicketNumber not found with this "+ticketNumber));

        return ticketMapper.todto(ticket);
    }

    @Override
    public TicketResponseDto getTicketByBooking(Long bookingId) {
        Ticket ticket=ticketRepository.findByBookingId(bookingId).orElseThrow(()->new ResourceNotFoundException("Booking Id not exist with this"+bookingId));

        return ticketMapper.todto(ticket);
    }

    @Override
    public List<TicketResponseDto> getActiveTickets() {
        List<Ticket>ticketList=ticketRepository.findByTicketStatus(TicketStatus.ACTIVE);
        return ticketList.stream().map(ticketMapper::todto).toList();
    }


    @Override
    public Page<TicketResponseDto> getAllTickets(int page, int size, String sortBy, String sortDir) {
        Sort sort=sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortDir).descending();
        Pageable pageable= PageRequest.of(page,size,sort);
        Page<Ticket>pages=ticketRepository.findAll(pageable);
        return pages.map(ticketMapper::todto);
    }

    @Override
    public List<TicketResponseDto> getTicketsByMovie(Long movieId) {
        List<Ticket>ticketList=ticketRepository.findByMovieId(movieId);
        return ticketList.stream().map(ticketMapper::todto).toList();
    }

    @Override
    public List<TicketResponseDto> getTicketsByTheatre(Long theatreId) {
        List<Ticket>ticketList=ticketRepository.findByTheatreId(theatreId);
        return ticketList.stream().map(ticketMapper::todto).toList();
    }

    @Override
    public List<TicketResponseDto> getTicketsByshowDate(LocalDate showDate) {
        List<Ticket>ticketList=ticketRepository.findByShowDate(showDate);
        return ticketList.stream().map(ticketMapper::todto).toList();
    }

    @Override
    public List<TicketResponseDto> getMyTickets() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        List<Ticket>ticketList=ticketRepository.findMyTickets(email);

        return ticketList.stream().map(ticketMapper::todto).toList();
    }

}
