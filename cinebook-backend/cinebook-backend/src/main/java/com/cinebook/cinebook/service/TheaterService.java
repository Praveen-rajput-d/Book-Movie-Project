package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.request.TheaterRequestDto;
import com.cinebook.cinebook.dto.response.MovieResponseDto;
import com.cinebook.cinebook.dto.response.TheaterResponseDto;
import com.cinebook.cinebook.entity.Theater;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TheaterService {
    //add Theatre
    TheaterResponseDto addTheatre(TheaterRequestDto requestDto);

    //Get All Theatre
    Page<TheaterResponseDto> getAllTheatre(int size,int page,String sortDir,String sortBy);

    List<TheaterResponseDto>AllTheatres();

    //Get Theatre By id
    TheaterResponseDto getTheatregetById(Long id);

    //Update Theatre
    TheaterResponseDto updateTheatre(Long id,TheaterRequestDto requestDto);
    //Delete Theatre
    void deleteTheatre(Long id);
    //activate theatre
     TheaterResponseDto activateTheater(Long id);

//search theatre
    List<TheaterResponseDto>searchTheatre(String name);
    //search by city
    List<TheaterResponseDto>getTheatreByCity(String city);
    //search by state
    List<TheaterResponseDto>getTheatreByState(String state);
    //only the active theatre
    List<TheaterResponseDto>getTheatre();
    //search by pincode
    List<TheaterResponseDto>getTheatreByPincode(String pincode);

    //get total screen according to theatre
    List<TheaterResponseDto>getTheatreByMinimumScreens(int totalScreen);
 //count active theaters
    long countActiveTheaters();

}
