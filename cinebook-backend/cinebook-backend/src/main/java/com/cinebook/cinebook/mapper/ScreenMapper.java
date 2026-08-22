package com.cinebook.cinebook.mapper;

import com.cinebook.cinebook.dto.request.ScreenRequestDto;
import com.cinebook.cinebook.dto.response.ScreenResponseDto;
import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.entity.Theater;
import org.springframework.stereotype.Component;

@Component
public class ScreenMapper {
    //DTo->Entity

    public Screen toEntity(ScreenRequestDto requestDto,Theater theater){
        Screen screen=new Screen();

        screen.setScreenName(requestDto.getScreenName());
        screen.setScreenType(requestDto.getScreenType());
        screen.setCapacity(requestDto.getCapacity());
        screen.setIsActive(requestDto.getActive());
        screen.setTheater(theater);
        return screen;
    }

    //Entity->Dto

     public   ScreenResponseDto todto(Screen screen){
        ScreenResponseDto dto=new ScreenResponseDto();
        dto.setId(screen.getId());
        dto.setScreeName(screen.getScreenName());
        dto.setScreenType(screen.getScreenType());
        dto.setCapacity(screen.getCapacity());
        dto.setActive(screen.getIsActive());

        dto.setTheaterId(screen.getTheater().getId());
        dto.setTheaterName(screen.getTheater().getName());
        dto.setCreatedAt(screen.getCreateAt());
        dto.setUpdatedAt(screen.getUpdatedAt());
return dto;
    }
}
