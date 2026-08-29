package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.request.ShowRequestDto;
import com.cinebook.cinebook.dto.response.ShowResponseDto;
import com.cinebook.cinebook.service.ShowService;
import lombok.Generated;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/show")
@RequiredArgsConstructor
public class ShowController {
    private  final ShowService showService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ShowResponseDto>addShow( @RequestBody ShowRequestDto requestDto){

        return new ResponseEntity<>(showService.addShow(requestDto), HttpStatus.CREATED);
    }

    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping
    public ResponseEntity<Page<ShowResponseDto>>getAllShow(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam (defaultValue = "5") int size,
                                                           @RequestParam(defaultValue = "id") String sortBy,
                                                           @RequestParam (defaultValue = "asc") String sortDir){
        return ResponseEntity.ok(showService.getAllShow(page,size,sortBy,sortDir));

    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/{id}")
    public ResponseEntity<ShowResponseDto>getShowById(@PathVariable Long id){
        return ResponseEntity.ok(showService.getShowByid(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ShowResponseDto>updateShow(@PathVariable Long id,@RequestBody ShowRequestDto requestDto){
        return ResponseEntity.ok(showService.updateShow(id,requestDto));
    }
 //deactivate the shows
 @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<String>deleteShow(@PathVariable Long id){
        showService.deleteShow(id);
        return ResponseEntity.ok("Show Deleted Successfully");
    }
    //activate the shows
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/activate/{id}")
    public ResponseEntity<ShowResponseDto>activateShows(@PathVariable Long id){
        return ResponseEntity.ok(showService.activateShows(id));
    }

    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<ShowResponseDto>>searchBymovieid(@PathVariable Long movieId){
        return ResponseEntity.ok(showService.searchByMovie(movieId));
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/screen/{screenId}")
    public ResponseEntity<List<ShowResponseDto>>searchByScreen(@PathVariable Long screenId){
        return ResponseEntity.ok(showService.searchByScreen(screenId));
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/date/{showDate}")
    public ResponseEntity<List<ShowResponseDto>>getShowsByDate(@PathVariable LocalDate showDate){
        return ResponseEntity.ok(showService.searchByShowsDate(showDate));
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/time/{time}")
    public ResponseEntity<List<ShowResponseDto>>getShowsByStartTime(@PathVariable LocalTime time){
        return ResponseEntity.ok(showService.searchByShowsTime(time));
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/active")
    public ResponseEntity<List<ShowResponseDto>>getActiveShows(){
        return ResponseEntity.ok(showService.getActiveShows());
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/upcoming")
    public ResponseEntity<List<ShowResponseDto>>getUpcomingshows(){
        return ResponseEntity.ok(showService.getUpcomingshows());
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/today")
    public ResponseEntity<List<ShowResponseDto>>getTodaysShows(){
        return ResponseEntity.ok(showService.getTodaysShows());
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/count/active")
    public ResponseEntity<Long>countActiveShows(){
        return ResponseEntity.ok(showService.countActiveShows());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
public ResponseEntity<List<ShowResponseDto>>allShows(){
        return  ResponseEntity.ok(showService.allShows());
}
}
