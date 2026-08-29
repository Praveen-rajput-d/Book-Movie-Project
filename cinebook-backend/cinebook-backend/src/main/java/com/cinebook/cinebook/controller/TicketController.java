package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.response.TicketResponseDto;
import com.cinebook.cinebook.serviceImpl.TicketServiceImp;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketServiceImp ticketService;
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDto>getTicketByid(@PathVariable  Long id){
        return ResponseEntity.ok(ticketService.getTicketById(id));

    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/number/{ticketNumber}")
    public ResponseEntity<TicketResponseDto>getTicketByTicketId(@PathVariable String ticketNumber){
        return ResponseEntity.ok(ticketService.getTicketByticketNumber(ticketNumber));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<TicketResponseDto>getTicketByBookingId(@PathVariable Long bookingId){
        return ResponseEntity.ok(ticketService.getTicketByBooking(bookingId));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/ActiveTickets")
    public ResponseEntity<List<TicketResponseDto>>getActiveTickets(){
        return ResponseEntity.ok(ticketService.getActiveTickets());
    }
    public ResponseEntity<Page<TicketResponseDto>>getAllTickets(@RequestParam (defaultValue = "0")int page,
                                                                @RequestParam(defaultValue = "5")int size,
                                                                @RequestParam(defaultValue = "generatedAt")String sortBy,
                                                                @RequestParam(defaultValue = "desc")String sortDir){
        return ResponseEntity.ok(ticketService.getAllTickets(page,size,sortBy,sortDir));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<TicketResponseDto>>getTicketsByMovieId(@PathVariable Long movieId){
        return ResponseEntity.ok(ticketService.getTicketsByMovie(movieId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/theatre/{theatreId}")
    public  ResponseEntity<List<TicketResponseDto>>getTicketsBytheatreid(@PathVariable Long theatreId){
        return ResponseEntity.ok(ticketService.getTicketsByTheatre(theatreId));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/showDate/{showDate}")
    public ResponseEntity<List<TicketResponseDto>>getTicketByShowDate(@PathVariable LocalDate showDate){
        return ResponseEntity.ok(ticketService.getTicketsByshowDate(showDate));
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/my-tickets")
    public ResponseEntity<List<TicketResponseDto>>getMyTickets(){
        return ResponseEntity.ok(ticketService.getMyTickets());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<TicketResponseDto>>allTickets(){
        return ResponseEntity.ok(ticketService.allTickets());
    }
}
