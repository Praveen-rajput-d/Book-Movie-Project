package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.request.BookingRequestDto;
import com.cinebook.cinebook.dto.response.BookingResponseDto;
import com.cinebook.cinebook.dto.response.MovieRevenueDto;
import com.cinebook.cinebook.entity.*;
import com.cinebook.cinebook.enums.BookingSeatStatus;
import com.cinebook.cinebook.enums.BookingStatus;
import com.cinebook.cinebook.enums.SeatType;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.mapper.BookingMapper;
import com.cinebook.cinebook.repository.*;
import com.cinebook.cinebook.service.BookingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl  implements BookingService {
      private  final BookingRepository bookingRepository;
      private  final BookingSeatRepository bookingSeatRepository;
      private  final ShowRepository showRepository;
      private final UserRepository userRepository;
      private  final BookingMapper bookingMapper;
      private  final SeatRepository seatRepository;
      private  final  TicketRepository ticketRepository;

    @Override
    public BookingResponseDto createBooking(BookingRequestDto request) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
       String email=authentication.getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        Show show=showRepository.findById(request.getShowId()).orElseThrow(()->new ResourceNotFoundException("Show Not Found"));

        List<Seat>seats=seatRepository.findAllById(request.getSeatIds());
        //validation
        if(seats.size()!=request.getSeatIds().size()){
            throw  new ResourceNotFoundException("one or more seats not found");
        }
        //check the active seats
        for(Seat seat:seats){
            if(!seat.isActive()){
                throw  new RuntimeException("seat"+seat.getSeatNumber()+"is inactive");
            }
        }
        //verift seats belongs to the selected show
        for(Seat seat:seats){
            if(!seat.getScreen().getId().equals(show.getScreen().getId())){
                throw new RuntimeException("Seat"+seat.getSeatNumber()+"does not belong to this show.");
            }
        }

        List<BookingSeat>alreadyBookedSeats=bookingSeatRepository.findBookedSeats(show.getId(),request.getSeatIds());
        if(!alreadyBookedSeats.isEmpty()){
            throw  new RuntimeException(
                    "one or more seats are already booked."
            );
        }
        double totalAmount=0;
        for(Seat seat:seats){
            switch (seat.getSeatType()){
                case REGULAR :
                    totalAmount +=200;
                    break;
                case PREMIUM:
                    totalAmount+=300;
                    break;
                case VIP:
                    totalAmount+=500;
                    break;

            }
        }
        String bookingNumber="BK-"+LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE)+"-"+ UUID.randomUUID().toString().substring(0,6).toUpperCase();
        Booking booking=Booking.builder()
                .bookingNumber(bookingNumber)
                .bookingTime(LocalDateTime.now())
                .bookingStatus(BookingStatus.PENDING)
                .totalAmount(totalAmount)
                .user(user)
                .show(show)
                .build();
        booking=bookingRepository.save(booking);

        List<BookingSeat>bookingSeats=new ArrayList<>();
        for(Seat seat:seats){
            double price=0;
            switch (seat.getSeatType()){
                case REGULAR :
                    price=200;
                    break;
                case PREMIUM:
                    price=300;
                    break;
                case  VIP:
                    price=500;
                    break;
            }
            BookingSeat bookingSeat=BookingSeat.builder()
                    .booking(booking)
                    .seat(seat)
                    .price(price)
                    .bookingSeatStatus(BookingSeatStatus.PENDING)
                    .build();
           bookingSeats.add(bookingSeat);

       List<BookingSeat>savedSeats=bookingSeatRepository.saveAll(bookingSeats);
            booking.setBookingSeats(savedSeats);
        }
        return bookingMapper.todto(booking);
    }

    @Override
    public Page<BookingResponseDto> getAllBookings(int page, int size, String sortBy, String sortDir) {
        Sort sort=sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortDir).descending();
        Pageable pageable= PageRequest.of(page,size,sort);
        Page<Booking>pages=bookingRepository.findAll(pageable);
        return pages.map(bookingMapper::todto);
    }


    @Override
    public BookingResponseDto getBookingById(Long bookingId) {
        Booking booking=bookingRepository.findById(bookingId).orElseThrow(()->new ResourceNotFoundException("Booking Id Not Found"));

        return bookingMapper.todto(booking);
    }

    @Override
    public List<BookingResponseDto> searchByBookingNumber(String BookingNumber) {
        List<Booking>bookings=bookingRepository.findByBookingNumber(BookingNumber);
        return bookings.stream().map(bookingMapper::todto).toList();
    }

    @Override
    public List<BookingResponseDto> searchByStatus(BookingStatus bookingstatus) {
        List<Booking>bookings=bookingRepository.findByBookingStatus(bookingstatus);
        return bookings.stream().map(bookingMapper::todto).toList();
    }

    @Override
    public List<BookingResponseDto> getMyBookings() {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        List<Booking>bookings=bookingRepository.findByUser(user);
        return bookings.stream().map(bookingMapper::todto).toList();
    }

    @Override
    @Transactional
    public void cancelBooking(Long bookingId) {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"+email));
        Booking booking=bookingRepository.findById(bookingId).orElseThrow(()->new ResourceNotFoundException("Booking Not Found with this booking Id"+bookingId));
        //user are able to cancel only there own booking not others userss booking
        if (booking.getUser().getId() != user.getId()) {
            throw new RuntimeException(
                    "You are not allowed to cancel other users booking"
            );
        }
        //user can only cancel there own booking ony one time
        if(booking.getBookingStatus()==BookingStatus.CANCELLED){
            throw new RuntimeException("Booking is already cancelled");
        }
        booking.setBookingStatus(BookingStatus.CANCELLED);
        List<BookingSeat>bookingSeats=bookingSeatRepository.findByBooking(booking);
        for(BookingSeat bookingSeat:bookingSeats){
            bookingSeat.setBookingSeatStatus(BookingSeatStatus.CANCELLED);
        }
        bookingSeatRepository.saveAll(bookingSeats);
        bookingRepository.save(booking);
    }

    @Override
    public List<BookingResponseDto> allBookings() {
        return bookingRepository.findAll().stream().map(bookingMapper::todto).toList();
    }


}
