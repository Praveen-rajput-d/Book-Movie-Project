package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.entity.Ticket;
import com.cinebook.cinebook.enums.TicketStatus;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {
    Optional<Ticket>findByTicketNumber(String ticketNumber);
    Optional<Ticket>findByBookingId(Long bookingId);
    List<Ticket>findByTicketStatus(TicketStatus ticketStatus);
    Page<Ticket>findAll(Pageable pageable);


    //search tickets
    @Query( """
    SELECT t from Ticket t WHERE t.booking.show.movie.id=:movieId
""")
    List<Ticket>findByMovieId(@Param("movieId")Long movieId);

    @Query(
            """
SELECt t from Ticket t where t.booking.show.screen.theater.id=:theaterId
"""
    )
    List<Ticket>findByTheatreId(@Param("theaterId")Long theatreId);

    @Query(
            """
SELECT t from Ticket t where t.booking.show.showDate=:showDate
"""
    )
    List<Ticket>findByShowDate(@Param("showDate")LocalDate showDate);
    @Query(
            """
SELECT
t from Ticket t where t.booking.user.email=:email
"""
    )

    List<Ticket>findMyTickets(@Param("email")String email);


    //today's tickets
    @Query(
            """
select count(t) from Ticket t where 
t.generatedAt>=:start and t.generatedAt<:end
"""
    )
    Long countTodayTickets(@Param("start")LocalDateTime start,
                           @Param("end")LocalDateTime end);
}
