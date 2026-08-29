package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.request.ScreenRequestDto;
import com.cinebook.cinebook.dto.response.ScreenResponseDto;
import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.entity.Seat;
import com.cinebook.cinebook.entity.Theater;
import com.cinebook.cinebook.enums.SeatType;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.mapper.ScreenMapper;
import com.cinebook.cinebook.repository.ScreenRepository;
import com.cinebook.cinebook.repository.SeatRepository;
import com.cinebook.cinebook.repository.TheaterRepository;
import com.cinebook.cinebook.service.ScreenService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScreenServiceImpl implements ScreenService {
           private  final ScreenRepository screenRepository;
           private final ScreenMapper screenMapper;
           private final TheaterRepository theaterRepository;
           private  final SeatRepository seatRepository;
    @Override
    public ScreenResponseDto addScreen(ScreenRequestDto requestDto) {
        Theater theater=theaterRepository.findById(requestDto.getTheaterId())
                .orElseThrow(()->new ResourceNotFoundException("Theater Not Found"));

        Screen screen=screenMapper.toEntity(requestDto,theater);
        Screen savedscreen=screenRepository.save(screen);
        genearateSeats(savedscreen);
        return screenMapper.todto(savedscreen);
    }

    private void genearateSeats(Screen screen){
        List<Seat>lists=new ArrayList<>();
        //find the total seats
        int totalCapacityofSeats=screen.getCapacity();
        //decide how many seats in one row
        int seatsRow=10;
        int totalRows=(int)Math.ceil((double)totalCapacityofSeats/seatsRow);
        int generatedSets=0;
        for(int i=0;i<totalRows;i++){
            char rowLetter=(char)('A'+i);
            for(int j=1;j<seatsRow;j++){
                if(generatedSets>=totalCapacityofSeats){
                    break;
                }
                String seatNumber=rowLetter+String.valueOf(j);
                Seat seat=new Seat();
                seat.setSeatNumber(seatNumber);
                seat.setSeatRow(String.valueOf(rowLetter));
                seat.setSeatType(SeatType.REGULAR);
                seat.setActive(true);
                seat.setScreen(screen);
                lists.add(seat);
                generatedSets++;
            }
        }
        seatRepository.saveAll(lists);



    }

    @Override
    public Page<ScreenResponseDto> getAllScreen(int page, int size, String sortBy, String sortDir) {
        Sort sort=sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable= PageRequest.of(page,size,sort);
        Page<Screen>pages=screenRepository.findAll(pageable);
        return pages.map(screenMapper::todto);
    }

    @Override
    public List<ScreenResponseDto> allScreens() {
        return screenRepository.findAll().stream().map(screenMapper::todto).toList();
    }


    @Override
    public ScreenResponseDto getScreenByid(Long id) {
        Screen screen=screenRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Screen Not found with"+id));
        return  screenMapper.todto(screen);
    }

    @Override
    public ScreenResponseDto updateScreen(Long id, ScreenRequestDto requestDto) {
         Screen screen=screenRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Screen Not Found"+id));
          Theater theater=theaterRepository.findById(requestDto.getTheaterId())
                          .orElseThrow(()->new ResourceNotFoundException("Theater Not Found"+id));
         screen.setScreenName(requestDto.getScreenName());
         screen.setScreenType(requestDto.getScreenType());
         screen.setCapacity(requestDto.getCapacity());
         screen.setIsActive(requestDto.getActive());
         screen.setUpdatedAt(LocalDateTime.now());
       screen.setTheater(theater);
         Screen updatedScreen=screenRepository.save(screen);
        return screenMapper.todto(updatedScreen);
    }

    //delete the screen permantely
    @Override
    public void DeleteScreen(Long id) {
        Screen screen=screenRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Screen not found"+id));

        screenRepository.delete(screen);

    }

    //deactivate the screen(soft Delete)
    @Override
    public void deactivateScreen(Long id) {
        Screen screen=screenRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Screen Not Found"));

        screen.setIsActive(false);
        screenRepository.save(screen);
    }

    //Screen Activate
    @Override
    public ScreenResponseDto activateScreen(Long id) {
        Screen screen=screenRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Screen Not Found"+id));
        screen.setIsActive(true);
       Screen savescreen=screenRepository.save(screen);
        return screenMapper.todto(savescreen) ;
    }

    @Override
    public List<ScreenResponseDto> searchScreen(String screenName) {
        List<Screen>screens=screenRepository.findByScreenNameContainingIgnoreCase(screenName);
        return screens.stream().map(screenMapper::todto).toList();
    }

    @Override
    public List<ScreenResponseDto> searchByScreenType(String screenType) {
        return screenRepository
                .findByScreenTypeIgnoreCase(screenType)
                .stream()
                .map(screenMapper::todto)
                .toList();
    }

    @Override
    public List<ScreenResponseDto> getActiveScreens() {
      return   screenRepository.findByIsActiveTrue()
                .stream()
                .map(screenMapper::todto)
                .toList();
    }

    @Override
    public List<ScreenResponseDto> getNotActiveScreens() {
        return screenRepository.findByIsActiveFalse().stream().map(screenMapper::todto).toList();
    }

    @Override
    public long countActiveScreens() {

        return screenRepository.countByIsActiveTrue();
    }




    @Override
    public List<ScreenResponseDto> getScreenByTheater(Long theaterId) {

        return screenRepository.findByTheaterId(theaterId).stream().map(
                screenMapper::todto
        ).toList();
    }


}
