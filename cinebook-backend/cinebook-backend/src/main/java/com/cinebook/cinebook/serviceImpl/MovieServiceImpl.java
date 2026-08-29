package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.mapper.MovieMapper;
import com.cinebook.cinebook.dto.request.MovieRequestDto;
import com.cinebook.cinebook.dto.response.MovieResponseDto;
import com.cinebook.cinebook.entity.Movie;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.repository.MovieRepository;
import com.cinebook.cinebook.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {
  private  final MovieRepository movieRepository;
  private  final  MovieMapper movieMapper;


    @Override
    public MovieResponseDto addmovie(MovieRequestDto movieRequestDto) {
     Movie movie=movieMapper.toEntity(movieRequestDto);
        Movie saveMovie=movieRepository.save(movie);
        return movieMapper.toDto(saveMovie);


    }

    @Override
    public Page<MovieResponseDto> getAllMovies(int page,int size,String sortBy,String sortDir) {
        Sort sort= sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();

        Pageable pageable= PageRequest.of(page,size,sort);
        Page<Movie>moviePage=movieRepository.findAll(pageable);


        return moviePage.map(movieMapper::toDto);
    }

    @Override
    public MovieResponseDto getMovieById(Long id) {
        Movie movie=movieRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Movie not found"));

        return movieMapper.toDto(movie);
    }

    @Override
    public void deleteMovie(long id) {
        Movie  movie=movieRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Movie not found"));
        movie.setIsActive(false);
        movieRepository.save(movie);

    }

    @Override
    public MovieResponseDto updateMovie(Long id, MovieRequestDto movieRequestDto) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        movie.setTitle(movieRequestDto.getTitle());
        movie.setDescription(movieRequestDto.getDescription());
        movie.setGenre(movieRequestDto.getGenre());
        movie.setLanguage(movieRequestDto.getLanguage());
        movie.setDuration(movieRequestDto.getDuration());
        movie.setReleaseDate(movieRequestDto.getReleaseDate());
        movie.setPosterUrl(movieRequestDto.getPosterUrl());
        movie.setTrailerUrl(movieRequestDto.getTrailerUrl());
        movie.setRating(movieRequestDto.getRating());
        movie.setIsActive(movieRequestDto.getActive());
        movie.setUpdatedAt(LocalDateTime.now());

        Movie updatedMovie = movieRepository.save(movie);



        return movieMapper.toDto(updatedMovie);
    }



    //activate the movies

    @Override
    public MovieResponseDto activateMovie(Long id) {
        Movie movie=movieRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Movie Not Found"+id));
        movie.setIsActive(true);
        Movie saved=movieRepository.save(movie);
        return movieMapper.toDto(saved) ;
    }
    @Override
    public List<MovieResponseDto> searchMovie(String title) {
        List<Movie>movies=movieRepository.findByTitleContainingIgnoreCase(title);

        return movies.stream().map(movieMapper::toDto).toList();
    }

    @Override
    public List<MovieResponseDto> getMoviesByGenre(String genre) {
       return movieRepository.findByGenreIgnoreCase(genre).stream()
               .map(movieMapper::toDto)
               .toList();


    }

    @Override
    public List<MovieResponseDto> getMoviesByLanguage(String language) {
        return movieRepository.findByLanguageIgnoreCase(language).stream().map(movieMapper::toDto).toList();
    }

    @Override
    public List<MovieResponseDto> getActiveMovies() {
        return movieRepository.findByIsActiveTrue().stream().map(
                movieMapper::toDto
        ).toList();
    }

    @Override
    public List<MovieResponseDto> getUpcomingMovies() {
        return movieRepository.findByReleaseDateAfter(LocalDate.now()).stream().map(
                movieMapper::toDto
        ).toList();
    }

    @Override
    public List<MovieResponseDto> getReleaseMovies() {
        return movieRepository.findByReleaseDateAfter(LocalDate.now()).stream().map(
                movieMapper::toDto
        ).toList();
    }

    @Override
    public Long countActiveMovies() {
        return movieRepository.countByIsActiveTrue();
    }


}
