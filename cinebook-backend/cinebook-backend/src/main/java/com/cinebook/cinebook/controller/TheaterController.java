package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.request.TheaterRequestDto;
import com.cinebook.cinebook.dto.response.TheaterResponseDto;
import com.cinebook.cinebook.service.TheaterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theater")
@RequiredArgsConstructor
public class TheaterController {
private  final TheaterService theaterService;

//add a Theater

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TheaterResponseDto>addTheatre( @Valid @RequestBody  TheaterRequestDto requestDto){
        TheaterResponseDto responseDto=theaterService.addTheatre(requestDto);
        return new ResponseEntity<>(responseDto,HttpStatus.CREATED);
    }


    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/{id}")
public ResponseEntity<TheaterResponseDto>getTheatreById( @PathVariable  Long id){
        return ResponseEntity.ok(theaterService.getTheatregetById(id));
}
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
@GetMapping
public ResponseEntity<Page<TheaterResponseDto>>getAllTheater(@RequestParam (defaultValue = "0")int page,
                                                             @RequestParam(defaultValue = "5")int size,
                                                             @RequestParam(defaultValue = "id")String sortBy,
                                                             @RequestParam(defaultValue = "asc")String sorDir){
        return ResponseEntity.ok(theaterService.getAllTheatre(page,size,sortBy,sorDir));
}

    @PreAuthorize("hasRole('ADMIN')")
@PutMapping("/{id}")
public ResponseEntity<TheaterResponseDto>updateTheater( @PathVariable Long id,@RequestBody  TheaterRequestDto requestDto){
        return ResponseEntity.ok(theaterService.updateTheatre(id,requestDto));
}

    @PreAuthorize("hasRole('ADMIN')")
@PutMapping("/{id}/deactivate")
public ResponseEntity<String >deleteTheater(@PathVariable  Long id){
        theaterService.deleteTheatre(id);
        return ResponseEntity.ok("Theatre Deleted Successfully");
}
//activate the theater
@PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/activate")
    public ResponseEntity<TheaterResponseDto>activateTheater(@PathVariable Long id){
        return ResponseEntity.ok(theaterService.activateTheater(id));
    }
//search Theatre By name

    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/search/{name}")
    public ResponseEntity<List<TheaterResponseDto>>searchTheatreByName(@PathVariable  String name){
        return ResponseEntity.ok( theaterService.searchTheatre(name));
    }

    //get theatre by city
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/city/{city}")
    public ResponseEntity<List<TheaterResponseDto>>getTheatreByCity(@PathVariable String city){
        return ResponseEntity.ok(theaterService.getTheatreByCity(city));
    }
    //get theatre by state
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/state/{state}")
    public ResponseEntity<List<TheaterResponseDto>>getTheatreByState(@PathVariable String state){
        return ResponseEntity.ok(theaterService.getTheatreByState(state));
    }

    //get active theatre only
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/running")
    public ResponseEntity<List<TheaterResponseDto>>getActiveTheatre(){
        return ResponseEntity.ok(theaterService.getTheatre());
    }

    //get theatre by pincode
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/pincode/{pincode}")
    public ResponseEntity<List<TheaterResponseDto>>getTheatreByPincode( @PathVariable  String pincode){
        return ResponseEntity.ok(theaterService.getTheatreByPincode(pincode));
    }

    //get total screen accoring to theatre
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/screens/{totalScreen}")
    public ResponseEntity<List<TheaterResponseDto>>getTheatreByMinimumScreens(@PathVariable int totalScreen){
        return ResponseEntity.ok(theaterService.getTheatreByMinimumScreens(totalScreen));
    }

    //count active theaters

    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/count")
    public ResponseEntity<Long>countActiveTheaters(){
        return ResponseEntity.ok(theaterService.countActiveTheaters());
    }
}
