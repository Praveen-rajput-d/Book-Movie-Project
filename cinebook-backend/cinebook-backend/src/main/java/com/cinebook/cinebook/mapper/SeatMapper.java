package com.cinebook.cinebook.mapper;

import com.cinebook.cinebook.dto.request.SeatRequestDto;
import com.cinebook.cinebook.dto.response.SeatResponseDto;
import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.entity.Seat;
import org.springframework.stereotype.Component;

@Component
public class SeatMapper {
    //Dto-> Entity
    public Seat toEntity(SeatRequestDto requestDto, Screen screen){
        Seat seat=new Seat();
        seat.setSeatNumber(requestDto.getSeatNumber());
        seat.setSeatRow(requestDto.getSeatRow());
        seat.setSeatType(requestDto.getSeatType());
        seat.setActive(requestDto.getIsActive());
        seat.setScreen(screen);
        return seat;

    }
    //Entity-> todto
    public SeatResponseDto todto(Seat seat){
        SeatResponseDto responseDto=new SeatResponseDto();
        responseDto.setId(seat.getId());
        responseDto.setSeatNumber(seat.getSeatNumber());
        responseDto.setSeatRow(seat.getSeatRow());
        responseDto.setSeatType(seat.getSeatType());
        responseDto.setScreenId(seat.getScreen().getId());
        responseDto.setScreenName(seat.getScreen().getScreenName());
        responseDto.setCreatedAt(seat.getCreatedAt());
        responseDto.setUpdatedAt(seat.getUpdatedAt());
        return responseDto;
    }
}
