package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.request.SeatRequestDto;
import com.cinebook.cinebook.dto.response.SeatResponseDto;
import com.cinebook.cinebook.entity.Seat;
import com.cinebook.cinebook.enums.SeatType;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SeatService  {
    SeatResponseDto addSeat(SeatRequestDto requestDto);
    Page<SeatResponseDto> getAllSeats(int page, int size, String sortBy, String sortDir);
    SeatResponseDto getSeatsById(Long id);
    SeatResponseDto updateSeats(Long id, SeatRequestDto request);
    SeatResponseDto delete(Long id);
    SeatResponseDto undelete(Long id);
    Long countActiveSeats();

    List<SeatResponseDto>searchByScreen(Long screenId);
    List<SeatResponseDto>searchBySeatType(SeatType seatType);
    List<SeatResponseDto>searchBySeatNumber(String seatNumber);
    List<SeatResponseDto>IsactiveTrue();

//genearate seats
//    String generateSeats(Long screenId);
}
