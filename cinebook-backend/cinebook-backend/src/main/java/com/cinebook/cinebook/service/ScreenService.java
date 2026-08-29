package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.request.ScreenRequestDto;
import com.cinebook.cinebook.dto.response.ScreenResponseDto;
import com.cinebook.cinebook.entity.Theater;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ScreenService  {


    //add screen
    ScreenResponseDto addScreen(ScreenRequestDto requestDto);
    //get the screens with pagination
    Page<ScreenResponseDto> getAllScreen(int page,int size,String sortBy,String sortDir);
    List<ScreenResponseDto>allScreens();
    //get the screen by id
    ScreenResponseDto getScreenByid(Long id);
    //update the screen
    ScreenResponseDto updateScreen(Long id,ScreenRequestDto requestDto);
    //Delete the Screen permanently
    void DeleteScreen(Long id);
    //soft delete
    void deactivateScreen(Long id);
    //activate the screen
    ScreenResponseDto activateScreen(Long id);

    //search
    List<ScreenResponseDto>searchScreen(String screenName);
    //search by screen type
    List<ScreenResponseDto> searchByScreenType(String screenType);
    //search by only active secreen
    List<ScreenResponseDto> getActiveScreens();
    //get screen that is not active
    List<ScreenResponseDto>getNotActiveScreens();
    //count the total active screen
    long countActiveScreens();
    //Get the screen By Theater Id

    List<ScreenResponseDto>getScreenByTheater(Long theaterId);

}
