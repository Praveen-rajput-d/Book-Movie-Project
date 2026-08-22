package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.response.*;
import com.cinebook.cinebook.entity.Booking;
import com.cinebook.cinebook.entity.Movie;
import com.cinebook.cinebook.repository.*;
import com.cinebook.cinebook.service.DashBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DashBoardImp implements DashBoardService {
    private final MovieRepository movieRepository;
    private final TheaterRepository theaterRepository;
    private final ScreenRepository screenRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final TicketRepository ticketRepository;
    private final PaymentRepository paymentRepository;
    private final  ShowRepository showRepository;

     LocalDate today=LocalDate.now();
     LocalDateTime start=today.atStartOfDay();
     LocalDateTime end=today.plusDays(1).atStartOfDay();
    @Override
    public DashBoardResponseDto getDashBoard() {
        return DashBoardResponseDto.builder()
                .totalMovies(movieRepository.count())
                .totalTheater(theaterRepository.count())
                .totalScreen(screenRepository.count())
                .totalShows(showRepository.count())
                .totalBookings(bookingRepository.count())
                .totalTickets(ticketRepository.count())
                .totalUsers(userRepository.count())

                .totalRevenue(paymentRepository.TotalRevenue())


                .todaybookings(bookingRepository.countTodayBookings(start,end))
                .todayRevenue(paymentRepository.getTodayRevenue(start,end))
                .todayTickets(ticketRepository.countTodayTickets(start,end))
                .activeMovies(movieRepository.countByIsActiveTrue())
                .activeShows(showRepository.countByIsActiveTrue())
                .activeScreen(screenRepository.countByIsActiveTrue())
                .activeTheatre(theaterRepository.countByActiveTrue())

                .build();
    }

    @Override
    public MovieBookingStatsDto getMostBookedMovie() {
        List<Object[]>tempresult=bookingRepository.findMostBookedMovie(PageRequest.of(0,1));
        if(tempresult.isEmpty()){
            return null;
        }
        Object[]row=tempresult.get(0);
        return MovieBookingStatsDto.builder()
                .movieName((String) row[0])
                .totalBookings((Long) row[1]).build();
    }

    @Override
    public MovieRevenueDto getHighestRevenueMovie() {
        List<Object[]>tempresult=paymentRepository.findHighestRevenueByMovie(PageRequest.of(0,1));
        if(tempresult.isEmpty()){
            return null;
        }
        Object[]row=tempresult.get(0);
        
        return MovieRevenueDto.builder()
                .movieName((String) row[0]).totalRevenue((Double) row[1]).build();
    }

    @Override
    public List<BookingStatusResponseDto> getBookingTotalByStatus() {
      List<Object[]>result=bookingRepository.findTotalByBookingStatus();

        return result.stream()
                .map(row->
                        BookingStatusResponseDto.builder()
                                .status(row[0].toString())
                                .total((Long) row[1])
                                .build()).toList();
    }

    @Override
    public List<PaymentStatusResponseDto> getBookingTotalByPaymentStatus() {
        List<Object[]>tempresult=paymentRepository.findTotalBookingByPaymentStatus();

        return tempresult.stream().map(row->PaymentStatusResponseDto.builder()
                .status(row[0].toString())
                .totalBooking((Long) row[1]).build()).toList()
                ;
    }


}
