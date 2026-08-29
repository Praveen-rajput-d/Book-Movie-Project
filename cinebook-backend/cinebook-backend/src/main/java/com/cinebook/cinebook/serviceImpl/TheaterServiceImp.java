package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.request.TheaterRequestDto;
import com.cinebook.cinebook.dto.response.MovieResponseDto;
import com.cinebook.cinebook.dto.response.TheaterResponseDto;
import com.cinebook.cinebook.entity.Theater;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.mapper.TheaterMapper;
import com.cinebook.cinebook.repository.TheaterRepository;
import com.cinebook.cinebook.service.TheaterService;
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
public class TheaterServiceImp implements TheaterService {
    private  final TheaterRepository theaterRepository;
    private final TheaterMapper theaterMapper;
    @Override
    public TheaterResponseDto addTheatre(TheaterRequestDto requestDto) {
        Theater theater=theaterMapper.toEntity(requestDto);
        Theater saveTheatre=theaterRepository.save(theater);
        return theaterMapper.todto(saveTheatre);
    }

    @Override
    public Page<TheaterResponseDto> getAllTheatre(int page,int size,String sortBy,String sortDir) {
        Sort sort=sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable= PageRequest.of(page,size,sort);
        Page<Theater>Theatrepage=theaterRepository.findAll(pageable);
        return Theatrepage.map(theaterMapper::todto);
    }

    @Override
    public List<TheaterResponseDto> AllTheatres() {

        return theaterRepository.findAll().stream().map(theaterMapper::todto).toList();
    }

    @Override
    public TheaterResponseDto getTheatregetById(Long id) {
        Theater theater=theaterRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Theater Not Found"+id));

        return theaterMapper.todto(theater);
    }

    @Override
    public TheaterResponseDto updateTheatre(Long id, TheaterRequestDto requestDto) {
        Theater theater=theaterRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Theater Not Found"+id));

theater.setName(requestDto.getName());
theater.setAddress(requestDto.getAddress());
theater.setCity(requestDto.getCity());
theater.setState(requestDto.getState());
theater.setPincode(requestDto.getPincode());
theater.setTotalScreen(requestDto.getTotalScreen());
theater.setUpdatedAt(LocalDateTime.now());
  Theater updatedTheater=theaterRepository.save(theater);
        return theaterMapper.todto(updatedTheater);
    }

    @Override
    public void deleteTheatre(Long id) {
        Theater theater=theaterRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Theatre not found"+id));
        theater.setActive(false);
        theaterRepository.save(theater);

    }

    @Override
    public TheaterResponseDto activateTheater(Long id) {
        Theater theater=theaterRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Theater not found"+id));
        theater.setActive(true);
        Theater saved=theaterRepository.save(theater);
        return theaterMapper.todto(saved);
    }

    @Override
    public List<TheaterResponseDto> searchTheatre(String name) {
       List<Theater>theater= theaterRepository.findByNameContainingIgnoreCase(name);
        return theater.stream().map(theaterMapper::todto).toList();
    }

    @Override
    public List<TheaterResponseDto> getTheatreByCity(String city) {
        return theaterRepository.findByCityIgnoreCase(city).stream().map(theaterMapper::todto).toList();
    }

    @Override
    public List<TheaterResponseDto> getTheatreByState(String state) {
        return theaterRepository.findByStateIgnoreCase(state).stream().map(theaterMapper::todto).toList();
    }

    @Override
    public List<TheaterResponseDto> getTheatre() {
        List<Theater>theaters=theaterRepository.findByActiveTrue();
        return theaters.stream().map(theaterMapper::todto).toList();
    }

    @Override
    public List<TheaterResponseDto> getTheatreByPincode(String pincode) {

        return theaterRepository.findByPincodeIgnoreCase(pincode).stream().map(theaterMapper::todto).toList();
    }

    @Override
    public List<TheaterResponseDto> getTheatreByMinimumScreens(int totalScreen) {
        List<Theater>theaters=theaterRepository.findByTotalScreenGreaterThanEqual(totalScreen);

        return theaters.stream().map(theaterMapper::todto).toList() ;
    }

    @Override
    public long countActiveTheaters() {
        return theaterRepository.countByActiveTrue();
    }


}
