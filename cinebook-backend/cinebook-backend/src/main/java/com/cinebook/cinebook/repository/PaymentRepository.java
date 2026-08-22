package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.entity.Payment;
import com.cinebook.cinebook.entity.User;
import com.cinebook.cinebook.enums.PaymentMethod;
import com.cinebook.cinebook.enums.PaymentStatus;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    Optional<Payment>findByTransactionId(String transactionId);
    List<Payment>findByPaymentStatus(PaymentStatus paymentStatus);
    boolean existsByBookingId(Long bookingId);
    List<Payment>findByBookingUserId(Long userId);
    List<Payment>findByPaymentMethod(PaymentMethod paymentMethod);
    Optional<Payment>findByBookingId(Long bookingId);


    //this query is used to calculate the total revenue from the database table that has
    //success status of payment

    @Query(
            """
select COALESCE(SUM(p.amount),0) from Payment p where p.paymentStatus='SUCCESS'
"""
    )
    Double TotalRevenue();

    List<Payment>findByPaymentTimeBetween(LocalDateTime statDate,LocalDateTime endDate);

    Long countByPaymentStatus(PaymentStatus paymentStatus);



//todays revenue

    @Query(

            """
select  coalesce(sum(p.amount),0) from Payment p 
where p.paymentStatus='SUCCESS'
and p.paymentTime>=:start and p.paymentTime<:end
"""
    )
    Double getTodayRevenue(@Param("start")LocalDateTime start,
                           @Param("end")LocalDateTime end);
    @Query("""
SELECT p.booking.show.movie.title,
SUM(p.amount)
FROM Payment p
WHERE p.paymentStatus='SUCCESS'
GROUP BY p.booking.show.movie.id,
         p.booking.show.movie.title
ORDER BY SUM(p.amount) DESC
""")
    List<Object[]>findHighestRevenueByMovie(Pageable pageable);

    @Query(
            """
SELECT p.paymentStatus,count(p) from Payment p group by p.paymentStatus
"""
    )
    List<Object[]>findTotalBookingByPaymentStatus();

}

