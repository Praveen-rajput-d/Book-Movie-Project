package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.request.SeatRequestDto;
import com.cinebook.cinebook.dto.response.SeatResponseDto;
import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.entity.Seat;
import com.cinebook.cinebook.enums.SeatType;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.mapper.SeatMapper;
import com.cinebook.cinebook.repository.ScreenRepository;
import com.cinebook.cinebook.repository.SeatRepository;
import com.cinebook.cinebook.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {
    private final SeatRepository seatRepository;
    private final ScreenRepository screenRepository;
    private final SeatMapper seatMapper;


    @Override
    public SeatResponseDto addSeat(SeatRequestDto requestDto) {
    Screen screen=screenRepository.
            findById(requestDto.getScreenId()).
            orElseThrow(()->new ResourceNotFoundException("Screen Not found"));
    Seat seat=seatMapper.toEntity(requestDto,screen);
    Seat savedseat=seatRepository.save(seat);
        return seatMapper.todto(savedseat);
    }


    @Override
    public Page<SeatResponseDto> getAllSeats(int page, int size, String sortBy, String sortDir) {
        Sort sort=sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortDir).descending();
        Pageable pageable= PageRequest.of(page,size,sort);
        Page<Seat>pages=seatRepository.findAll(pageable);

        return pages.map(seatMapper::todto);
    }

    @Override
    public SeatResponseDto getSeatsById(Long id) {
        Seat seat=seatRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Seat Not Found"+id));
        return seatMapper.todto(seat);
    }

    @Override
    public SeatResponseDto updateSeats(Long id, SeatRequestDto request) {
        Seat seat=seatRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Seat Not found"));
        Screen screen=screenRepository.findById(request.getScreenId()).orElseThrow(()->new ResourceNotFoundException("screen Not Found"));

          seat.setSeatNumber(request.getSeatNumber());
          seat.setSeatRow(request.getSeatRow());
          seat.setSeatType(request.getSeatType());
          seat.setScreen(screen);
          seat.setActive(request.getIsActive());
          Seat updatedSeat=seatRepository.save(seat);
        return seatMapper.todto(updatedSeat);
    }

    //soft delete(deactivate seat)
    @Override
    public SeatResponseDto delete(Long id) {
      Seat seat=seatRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Seat Not Found"));
      seat.setActive(false);
      Seat savedseat=seatRepository.save(seat);
      return seatMapper.todto(savedseat);
    }

    //deactivate the seats
    @Override
    public SeatResponseDto undelete(Long id) {
        Seat seat=seatRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Seat Not Found"));
        seat.setActive(true);
        Seat  saveseat=seatRepository.save(seat);
        return seatMapper.todto(saveseat);
    }

    @Override
    public Long countActiveSeats() {
        return seatRepository.countByIsActiveTrue();
    }

    @Override
    public List<SeatResponseDto> searchByScreen(Long screenId) {
        return seatRepository.findByScreenId(screenId).stream().map(seatMapper::todto).toList();
    }

    @Override
    public List<SeatResponseDto> searchBySeatType(SeatType seatType) {
        return seatRepository.findBySeatType(seatType).stream().map(seatMapper::todto).toList();
    }

    @Override
    public List<SeatResponseDto> searchBySeatNumber(String seatNumber) {
        return seatRepository.findBySeatNumber(seatNumber).stream().map(seatMapper::todto).toList();
    }

    @Override
    public List<SeatResponseDto> IsactiveTrue() {
        return seatRepository.findByIsActiveTrue().stream().map(seatMapper::todto).toList();
    }

//    @Override
//    public String generateSeats(Long screenId) {
//        Screen screen=screenRepository.findById(screenId).orElseThrow(()->new ResourceNotFoundException("Screen Not Found"));
//       //prevent from duplicate Generation
//         if(seatRepository.existsByScreen(screen)){
//             throw new RuntimeException("Seats already generated for this screen.");
//         }
//
//         List<Seat>seats=new ArrayList<>();
//         int seatrow=10;
//         int totalSeats=screen.getCapacity();
//         int rows=(int)Math.ceil((double) totalSeats/seatrow);
//         for(int i=0;i<rows;i++){
//             char rowletter=(char)('A'+i);
//             for(int j=1;j<=seatrow;j++){
//                 if(seats.size()==totalSeats){
//                     break;
//                 }
//                 Seat seat=new Seat();
//                 seat.setSeatNumber(rowletter+String.valueOf(j));
//                 seat.setSeatType(SeatType.REGULAR);
//                 seat.setScreen(screen);
//                 seat.setActive(true);
//                 seats.add(seat);
//
//             }
//         }
//        seatRepository.saveAll(seats);
//        return seats.size()+"seats Generated successfully";
//    }
}

