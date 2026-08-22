package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.dto.response.SeatResponseDto;
import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.entity.Seat;
import com.cinebook.cinebook.enums.SeatType;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat,Long> {
    Long countByIsActiveTrue();
    List<Seat>findByScreenId(Long screenId);
    List<Seat>findBySeatNumber(String seatNumber);
    List<Seat>findBySeatType(SeatType seatType);
    List<Seat>findByIsActiveTrue();
    boolean existsByScreen(Screen screen);
}
