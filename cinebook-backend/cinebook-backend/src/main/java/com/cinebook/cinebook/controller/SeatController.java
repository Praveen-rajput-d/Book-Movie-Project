package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.request.SeatRequestDto;
import com.cinebook.cinebook.dto.response.SeatResponseDto;
import com.cinebook.cinebook.dto.response.SeatSelectionResponseDto;
import com.cinebook.cinebook.enums.SeatType;
import com.cinebook.cinebook.serviceImpl.SeatServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seat")
@RequiredArgsConstructor
public class SeatController {
    private final SeatServiceImpl seatService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<SeatResponseDto>addSeat(@RequestBody SeatRequestDto requestDto){
        return new ResponseEntity<>(seatService.addSeat(requestDto), HttpStatus.CREATED);
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping
    public ResponseEntity<Page<SeatResponseDto>>getAllSeats(@RequestParam (defaultValue = "0")int page, @RequestParam(defaultValue = "5")int size, @RequestParam(defaultValue = "id") String sortBy, @RequestParam(defaultValue = "asc") String sortDir){
        return ResponseEntity.ok(seatService.getAllSeats(page,size,sortBy,sortDir));
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/{id}")
    public ResponseEntity<SeatResponseDto>getSeatByid(@PathVariable Long id){
        return ResponseEntity.ok(seatService.getSeatsById(id));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<SeatResponseDto>updatedSeat(@PathVariable Long id,@RequestBody SeatRequestDto seatRequestDto){
        return ResponseEntity.ok(seatService.updateSeats(id,seatRequestDto));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<String>deactivateSeats(@PathVariable Long id){
        seatService.delete(id);
        return ResponseEntity.ok("Seat Deactivated Successfully");
    }

    //activate the seat
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/activate/{id}")
    public ResponseEntity<String>undeleteSeat(@PathVariable Long id){
        seatService.undelete(id);
        return ResponseEntity.ok("Seat UnDeleted Successfully");
    }

    //count the active seats
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/activeseats")
    public ResponseEntity<String>CountActiveSeats(){
        return ResponseEntity.ok("Total Active Seats:"+seatService.countActiveSeats());
    }

    //search  seat by screen Id
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/search/{screenId}")
     public ResponseEntity<List<SeatResponseDto>>searchByScreen(@PathVariable Long screenId){
        return ResponseEntity.ok(seatService.searchByScreen(screenId));
     }
     //search seat by seat number
     @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/SeatNumber/{seatNumber}")
    public ResponseEntity<List<SeatResponseDto>>getSeatBySeatNumber(@PathVariable String seatNumber){
        return ResponseEntity.ok(seatService.searchBySeatNumber(seatNumber));
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/type{seatType}")
    public ResponseEntity<List<SeatResponseDto>>getSeatBySeatType(@PathVariable SeatType seatType){
        return ResponseEntity.ok(seatService.searchBySeatType(seatType));
    }
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/active")
    public ResponseEntity<List<SeatResponseDto>>getOnlyActiveSeat(){
        return ResponseEntity.ok(seatService.IsactiveTrue());
    }
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/show/{showId}")
       public ResponseEntity<List<SeatSelectionResponseDto>>getSeatsByShow(@PathVariable Long showId){
        return ResponseEntity.ok(seatService.getSeatsByShow(showId));
       }
    //add city for screen
//    @PreAuthorize("hasRole('ADMIN')")
//    @PostMapping("/generate/{screenId}")
//    public ResponseEntity<String>generateSeats(@PathVariable Long screenId){
//        return ResponseEntity.ok(seatService.generateSeats(screenId));
//    }

}
