package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.entity.Booking;
import com.cinebook.cinebook.entity.BookingSeat;
import com.cinebook.cinebook.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingSeatRepository extends JpaRepository<BookingSeat,Long> {
List<BookingSeat>findByBooking(Booking booking);
List<BookingSeat>findBySeat(Seat seat);

    @Query("""
SELECT bs
FROM BookingSeat bs
WHERE bs.booking.show.id = :showId
AND bs.seat.id IN :seatIds
AND bs.booking.bookingStatus IN( 'CONFIRMED','PENDING')
AND bs.bookingSeatStatus IN('PENDING','CONFIRMED')
""")
    List<BookingSeat> findBookedSeats(
            @Param("showId") Long showId,
            @Param("seatIds") List<Long> seatIds
    );


    List<BookingSeat>findByBookingShowId(Long showId);
}
