package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.entity.Booking;
import com.cinebook.cinebook.entity.User;
import com.cinebook.cinebook.enums.BookingStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByBookingNumber(String bookingNumber);
    List<Booking>findByBookingStatus(BookingStatus bookingStatus);
    List<Booking>findByUser(User user);

    @Query(
            """
SELECT COUNT(b) FROM Booking b where b.bookingTime>=:start AND 
b.bookingTime<:end
"""
    )
    Long countTodayBookings(@Param("start")LocalDateTime start,
                            @Param("end")LocalDateTime end);




    //this query for admin dashboard for checking the total bookings according to the movieName
 @Query(
         """
select b.show.movie.title,count(b) from Booking b where b.bookingStatus='CONFIRMED' group by b.show.movie.id,b.show.movie.title order by count(b) desc 
"""
 )
   List<Object[]>findMostBookedMovie(Pageable pageable);
 //this query for the booking status report like success booking=4 ,pending =5 and failred=5

@Query(
        """
select b.bookingStatus, count(b) from Booking b group by b.bookingStatus
"""
)
    List<Object[]>findTotalByBookingStatus();

//query for booking time to check the booking is done on time or not
    @Query(
            """
select b from Booking b where b.bookingStatus='PENDING'
and b.bookingTime<=:expiryTime
"""
    )

     List<Booking>findExpiredBookings(
             @Param("expiryTime")LocalDateTime expiryTime
     );
}
