package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.request.ShowRequestDto;
import com.cinebook.cinebook.dto.response.ShowResponseDto;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ShowService {
    ShowResponseDto addShow(ShowRequestDto requestDto);
    Page<ShowResponseDto> getAllShow(int page, int size, String sortBy, String sortDir);
    ShowResponseDto getShowByid(Long id);
    ShowResponseDto updateShow(Long id,ShowRequestDto requestDto);
    void deleteShow(Long id);

    List<ShowResponseDto>searchByMovie(Long movieId);
    List<ShowResponseDto>searchByScreen(Long screenId);
    List<ShowResponseDto>searchByShowsDate(LocalDate date);
    List<ShowResponseDto>searchByShowsTime(LocalTime time);
    List<ShowResponseDto>getActiveShows();
    List<ShowResponseDto>getUpcomingshows();
    List<ShowResponseDto>getTodaysShows();
    Long countActiveShows();


    ShowResponseDto activateShows(Long id);
}
