package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.request.MovieRequestDto;
import com.cinebook.cinebook.dto.response.MovieResponseDto;
import com.cinebook.cinebook.entity.Movie;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MovieService {

    //CRUD
    MovieResponseDto addmovie(MovieRequestDto movieRequestDto);//add the movie
    Page<MovieResponseDto>getAllMovies(int page,int size,String sortBy,String sortDir);//get all movies
    MovieResponseDto getMovieById(Long id); //get movies by id
    void deleteMovie(long id);//delete movie
    MovieResponseDto updateMovie(Long id,MovieRequestDto movieRequestDto); //update the movie
    MovieResponseDto activateMovie(Long id);
      List<MovieResponseDto>getAllMovie(); //for all the database movies get
   //searching methods
    List<MovieResponseDto>searchMovie(String title);
    List<MovieResponseDto>getMoviesByGenre(String genre);
    List<MovieResponseDto>getMoviesByLanguage(String language);
    List<MovieResponseDto>getActiveMovies();
    List<MovieResponseDto>getUpcomingMovies();
    List<MovieResponseDto>getReleaseMovies();
    Long countActiveMovies();

}
