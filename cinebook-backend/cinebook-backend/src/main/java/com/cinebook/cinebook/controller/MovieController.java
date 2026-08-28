package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.request.MovieRequestDto;
import com.cinebook.cinebook.dto.response.MovieResponseDto;
import com.cinebook.cinebook.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.hibernate.type.ListType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {
    private  final MovieService movieService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<MovieResponseDto>addMovie( @Valid @RequestBody MovieRequestDto movieRequestDto){
        MovieResponseDto movieResponseDto=movieService.addmovie(movieRequestDto);
        return new ResponseEntity<>(movieResponseDto, HttpStatus.CREATED);
    }

   @PreAuthorize("hasAnyRole('USER','ADMIN')")
@GetMapping("/all")
    public  ResponseEntity<Page<MovieResponseDto>>getAllMovies(@RequestParam(defaultValue = "0")int page,
                                                             @RequestParam(defaultValue = "5")int size,
                                                             @RequestParam(defaultValue = "id")String sortBy,
                                                             @RequestParam(defaultValue = "asc")String sortDir){
        return ResponseEntity.ok(movieService.getAllMovies(page,size,sortBy,sortDir));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<MovieResponseDto>getMovieById(@PathVariable long id){
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<MovieResponseDto>updateMovies(@PathVariable Long id,@RequestBody MovieRequestDto movieRequestDto){
        return ResponseEntity.ok(movieService.updateMovie(id,movieRequestDto));
    }

//soft delete
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deactMovie/{id}")
    public ResponseEntity<String>deleteMovie(@PathVariable Long id){
        movieService.deleteMovie(id);
        return ResponseEntity.ok("Movie Deleted Successfully");
    }

    //activate the delted movie
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/actMovie/{id}")
    public ResponseEntity<String>activateMovie(@PathVariable Long id){
        movieService.activateMovie(id);
        return ResponseEntity.ok("Movie Activated Successfully");
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/search/{title}")
    public ResponseEntity<List<MovieResponseDto>>searchMovie(@PathVariable String title){
        return ResponseEntity.ok(movieService.searchMovie(title));
    }
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<MovieResponseDto>>getMoviesByGenre(@PathVariable  String genre){
        return ResponseEntity.ok(movieService.getMoviesByGenre(genre));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/language/{language}")
    public ResponseEntity<List<MovieResponseDto>>getMoviesBylanguage(@PathVariable  String language){
        return ResponseEntity.ok(movieService.getMoviesByLanguage(language));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/running")
    public ResponseEntity<List<MovieResponseDto>>getActiveMovies(){
        return ResponseEntity.ok(movieService.getActiveMovies());
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/upcoming")
    public ResponseEntity<List<MovieResponseDto>>getUpcomingMovies(){
        return ResponseEntity.ok(movieService.getUpcomingMovies());
    }


    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/released")
    public ResponseEntity<List<MovieResponseDto>>getReleaseMovies(){
        return ResponseEntity.ok(movieService.getReleaseMovies());
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/countMovie")
    public ResponseEntity<Long>countIsActiveMovie(){
        return ResponseEntity.ok(movieService.countActiveMovies());
    }

}
