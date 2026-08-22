package com.cinebook.cinebook.mapper;


import com.cinebook.cinebook.dto.request.MovieRequestDto;
import com.cinebook.cinebook.dto.response.MovieResponseDto;
import com.cinebook.cinebook.entity.Movie;
import org.springframework.stereotype.Component;

@Component
public class MovieMapper {

    // DTO -> Entity
    public Movie toEntity(MovieRequestDto dto) {

        Movie  movie = new Movie();

        movie.setTitle(dto.getTitle());
        movie.setDescription(dto.getDescription());
        movie.setDuration(dto.getDuration());
        movie.setGenre(dto.getGenre());
        movie.setLanguage(dto.getLanguage());
        movie.setReleaseDate(dto.getReleaseDate());
        movie.setPosterUrl(dto.getPosterUrl());
        movie.setTrailerUrl(dto.getTrailerUrl());
        movie.setRating(dto.getRating());
        movie.setIsActive(dto.getActive());

        return movie;
    }

    // Entity -> DTO
    public MovieResponseDto toDto(Movie movie) {

        MovieResponseDto dto = new MovieResponseDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDescription(movie.getDescription());
        dto.setDuration(movie.getDuration());
        dto.setGenre(movie.getGenre());
        dto.setLanguage(movie.getLanguage());
        dto.setReleaseDate(movie.getReleaseDate());
        dto.setPosterUrl(movie.getPosterUrl());
        dto.setTrailerUrl(movie.getTrailerUrl());
        dto.setRating(movie.getRating());
        dto.setActive(movie.getIsActive());
        dto.setCreatedAt(movie.getCreatedAt());
        dto.setUpdatedAt(movie.getUpdatedAt());

        return dto;
    }
}

