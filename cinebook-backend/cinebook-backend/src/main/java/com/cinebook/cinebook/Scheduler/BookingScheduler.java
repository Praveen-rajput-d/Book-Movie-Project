package com.cinebook.cinebook.Scheduler;

import com.cinebook.cinebook.entity.Booking;
import com.cinebook.cinebook.entity.BookingSeat;
import com.cinebook.cinebook.enums.BookingSeatStatus;
import com.cinebook.cinebook.enums.BookingStatus;
import com.cinebook.cinebook.repository.BookingRepository;
import com.cinebook.cinebook.repository.BookingSeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BookingScheduler {
    private final BookingRepository bookingRepository;
    private final BookingSeatRepository bookingSeatRepository;
    //if the client says cancel boookings after 10 minutes you dont change in code just change the application properties
    //booking.timeout.minutes=10 like this
    @Value("${booking.timeout.minutes}")
    private int bookingTimeoutMinutes;
    @Scheduled(fixedRate = 60000)
    public void cancelExpiredBookings(){
        LocalDateTime expiryTime=LocalDateTime.now().minusMinutes(bookingTimeoutMinutes);
        List<Booking>bookings=bookingRepository.findExpiredBookings(expiryTime);
        for(Booking booking:bookings){
            booking.setBookingStatus(BookingStatus.CANCELLED);
            List<BookingSeat>bookingSeats=bookingSeatRepository.findByBooking(booking);
            for(BookingSeat bookingSeat:bookingSeats){
                bookingSeat.setBookingSeatStatus(BookingSeatStatus.CANCELLED);
            }
            bookingSeatRepository.saveAll(bookingSeats);
            bookingRepository.save(booking);
            System.out.println("Booking Cancelled:"+booking.getBookingNumber());
        }
    }
}
