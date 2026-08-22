package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.request.BookingRequestDto;
import com.cinebook.cinebook.dto.response.BookingResponseDto;
import com.cinebook.cinebook.dto.response.ScreenResponseDto;
import com.cinebook.cinebook.entity.Booking;
import com.cinebook.cinebook.enums.BookingStatus;
import com.cinebook.cinebook.serviceImpl.BookingServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/booking")
@RequiredArgsConstructor
public class BookingController {
    private  final BookingServiceImpl bookingService;

    //create booking
    @PreAuthorize("hasAnyRole('USER','ADMIN')")  //both are allowed to book tickets
    @PostMapping
    public ResponseEntity<BookingResponseDto>createBooking(@Valid @RequestBody BookingRequestDto request){
        BookingResponseDto response=bookingService.createBooking(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    //get all booking
    @PreAuthorize(("hasRole('ADMIN')"))  ///  all the bookings can be seen by the admin only
    @GetMapping
    public ResponseEntity<Page<BookingResponseDto>>getAllBooking(@RequestParam (defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "5") int size,
                                                               @RequestParam(defaultValue = "id") String sortBy,
                                                               @RequestParam(defaultValue = "asc") String sortDir){
        return ResponseEntity.ok(bookingService.getAllBookings(page,size,sortBy,sortDir));
    }
    @PreAuthorize("hasAnyRole('USER','ADMIN')")  //this method only give booking by the booking id
    @GetMapping("{bookingId}")
    public ResponseEntity<BookingResponseDto>getBookingById(@PathVariable Long bookingId){
        return ResponseEntity.ok(bookingService.getBookingById(bookingId));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/search/bookingNumber")         //this api can search booking based on the booking number
    public ResponseEntity<List<BookingResponseDto>>searchBooking(@RequestParam String bookingNumber){
        return ResponseEntity.ok(bookingService.searchByBookingNumber(bookingNumber));
    }
    @PreAuthorize("hasAnyRole('USER','ADMIN')")  //this api search booking by the bookinstatus
    @GetMapping("/status")
    public ResponseEntity<List<BookingResponseDto>>searchByBookingStatus(@RequestParam BookingStatus bookingStatus){
        return ResponseEntity.ok(bookingService.searchByStatus(bookingStatus));
    }

    //get my bookings
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/my-bookings")      //this is only show  users own bookings only
    public ResponseEntity<List<BookingResponseDto>>getMyBookings(){
        return ResponseEntity.ok(bookingService.getMyBookings());
    }

    //cancel booking
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PutMapping("/cancel/{bookingId}")   //this api cancel the booking and both user and admin allow to cancel booking
    public ResponseEntity<String>cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok("Booking Cancelled Successfully");
    }
}
