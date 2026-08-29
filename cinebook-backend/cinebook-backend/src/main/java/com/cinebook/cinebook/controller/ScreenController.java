package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.request.ScreenRequestDto;
import com.cinebook.cinebook.dto.request.TheaterRequestDto;
import com.cinebook.cinebook.dto.response.ScreenResponseDto;
import com.cinebook.cinebook.entity.Theater;
import com.cinebook.cinebook.serviceImpl.ScreenServiceImpl;
import jakarta.validation.Valid;
import lombok.Locked;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/screen")
@RequiredArgsConstructor
public class ScreenController {
private  final ScreenServiceImpl screenService;
    //add screen
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ScreenResponseDto>addScreen(@Valid  @RequestBody  ScreenRequestDto requestDto){

      return new ResponseEntity<>(screenService.addScreen(requestDto),HttpStatus.CREATED);
    }

    //get all screen
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping
    public ResponseEntity<Page<ScreenResponseDto>>getAllScreen(@RequestParam (defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "5") int size,
                                                               @RequestParam(defaultValue = "id") String sortBy,
                                                               @RequestParam(defaultValue = "asc") String sortDir){
        return ResponseEntity.ok(screenService.getAllScreen(page,size,sortBy,sortDir));
    }
    //get screen by id
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/{id}")
    public ResponseEntity<ScreenResponseDto>getScreenByid(@PathVariable Long id){
        return ResponseEntity.ok(screenService.getScreenByid(id));
    }

    //update the screen
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ScreenResponseDto>updateScreen(@PathVariable Long id, @RequestBody ScreenRequestDto requestDto){
        return ResponseEntity.ok(screenService.updateScreen(id,requestDto));
    }
//  //Delete the screen permanently
//  @PreAuthorize("hasRole('ADMIN')")
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String>deleteScreen(@PathVariable Long id){
//        screenService.DeleteScreen(id);
//        return ResponseEntity.ok("Screen Is Deleted Successfully") ;
//    }

    //activate the screen (soft delete)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/activate")
     public ResponseEntity<ScreenResponseDto>activateScreen(@PathVariable Long id){
        return ResponseEntity.ok(screenService.activateScreen(id));
     }

     //deactivate the screen
     @PreAuthorize("hasRole('ADMIN')")
     @PutMapping("/{id}/deactivate")
     public ResponseEntity<String>deactivateScreen(@PathVariable Long id){
        screenService.deactivateScreen(id);
        return ResponseEntity.ok("Screen Is deactivated Successfully");
     }

     //search
     @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/search/{screenName}")
    public ResponseEntity<List<ScreenResponseDto>>searchScreen(@PathVariable  String screenName){
        return ResponseEntity.ok(screenService.searchScreen(screenName));
    }
    //seaarch by screen type
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/search/type/{screenType}")
    public ResponseEntity<List<ScreenResponseDto>> searchByScreenType(
            @PathVariable String screenType){

        return ResponseEntity.ok(
                screenService.searchByScreenType(screenType)
        );
    }

    //count total active screen
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/count/active")
    public ResponseEntity<Long> countActiveScreens(){

        return ResponseEntity.ok(
                screenService.countActiveScreens()
        );
    }
    //only active screen
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/active")
    public ResponseEntity<List<ScreenResponseDto>> getActiveScreens(){

        return ResponseEntity.ok(
                screenService.getActiveScreens()
        );
    }
    //get only inactive screen
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/Inactive")
    public ResponseEntity<List<ScreenResponseDto>> getNotActiveScreen(){

        return ResponseEntity.ok(
                screenService.getNotActiveScreens()
        );
    }
    //get the screens by theater id
    @PreAuthorize(("hasAnyRole('USER','ADMIN')"))
    @GetMapping("/theater/{theaterId}")
    public ResponseEntity<List<ScreenResponseDto>> getScreensByTheater(
            @PathVariable Long theaterId){

        return ResponseEntity.ok(
                screenService.getScreenByTheater(theaterId)
        );
    }
    @PreAuthorize(("hasRole('ADMIN')"))
    @GetMapping("/all")
    public ResponseEntity<List<ScreenResponseDto>>allScreens(){
        return  ResponseEntity.ok(screenService.allScreens());
    }
}
