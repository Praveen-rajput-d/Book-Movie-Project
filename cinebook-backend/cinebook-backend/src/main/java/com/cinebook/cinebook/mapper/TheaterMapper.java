package com.cinebook.cinebook.mapper;

import com.cinebook.cinebook.dto.request.TheaterRequestDto;
import com.cinebook.cinebook.dto.response.TheaterResponseDto;
import com.cinebook.cinebook.entity.Theater;
import com.cinebook.cinebook.repository.TheaterRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class TheaterMapper {
     //Map to -> DTO to Entity
    public Theater toEntity(TheaterRequestDto requestDto){
        Theater theater=new Theater();

        theater.setName(requestDto.getName());
        theater.setAddress(requestDto.getAddress());
      theater.setCity(requestDto.getCity());
      theater.setPincode(requestDto.getPincode());
      theater.setState(requestDto.getState());
      theater.setTotalScreen(requestDto.getTotalScreen());

      return theater;
    }

    // Map to-> Entity to dto

    public TheaterResponseDto todto(Theater theater){
        TheaterResponseDto responseDto=new TheaterResponseDto();

        responseDto.setId(theater.getId());
        responseDto.setName(theater.getName());
        responseDto.setAddress(theater.getAddress());
        responseDto.setCity(theater.getCity());
        responseDto.setState(theater.getState());
        responseDto.setPincode(theater.getPincode());
        responseDto.setTotalScreen(theater.getTotalScreen());
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setUpdatedAt(LocalDateTime.now());
        return responseDto;
    }
}
