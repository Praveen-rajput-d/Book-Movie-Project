package com.cinebook.cinebook.mapper;

import com.cinebook.cinebook.dto.request.ShowRequestDto;
import com.cinebook.cinebook.dto.response.ShowResponseDto;
import com.cinebook.cinebook.entity.Movie;
import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.entity.Show;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ShowMapper {
    //DTO-> Entity
    public Show toEntity(ShowRequestDto requestDto, Movie movie, Screen screen){
        Show show=new Show();
        show.setShowDate(requestDto.getShowDate());
        show.setStartTime(requestDto.getStartTime());
        show.setEndTime(requestDto.getEndTime());
        show.setAvailableSeats(requestDto.getAvailableSeats());
        show.setTicketPrice(requestDto.getTicketPrice());
        show.setIsActive(requestDto.getIsActive());
        show.setMovie(movie);
        show.setScreen(screen);
        return show;
    }

    //Entity to Dto
    public ShowResponseDto todto(Show show){
        ShowResponseDto responseDto=new ShowResponseDto();
        responseDto.setId(show.getId());
        responseDto.setShowDate(show.getShowDate());
        responseDto.setStartTime(show.getStartTime());
        responseDto.setEndTime(show.getEndTime());
        responseDto.setAvailableSeats(show.getAvailableSeats());
        responseDto.setIsActive(show.getIsActive());
        responseDto.setTicketPrice(show.getTicketPrice());
        responseDto.setMovieId(show.getMovie().getId());
        responseDto.setCratedAt(show.getCreatedAt());
        responseDto.setUpdatedAt(show.getUpdatedAt());
        responseDto.setMovieName(show.getMovie().getTitle());
        responseDto.setScreenId(show.getScreen().getId());
        responseDto.setScreenName(show.getScreen().getScreenName());
        responseDto.setTheaterId(show.getScreen().getTheater().getId());
        responseDto.setTheaterName(show.getScreen().getTheater().getName());
        return responseDto;
    }


}
