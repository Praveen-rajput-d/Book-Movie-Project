package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.request.ScreenRequestDto;
import com.cinebook.cinebook.dto.request.ShowRequestDto;
import com.cinebook.cinebook.dto.response.ShowResponseDto;
import com.cinebook.cinebook.entity.Movie;
import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.entity.Show;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.mapper.ShowMapper;
import com.cinebook.cinebook.repository.MovieRepository;
import com.cinebook.cinebook.repository.ScreenRepository;
import com.cinebook.cinebook.repository.ShowRepository;
import com.cinebook.cinebook.service.ShowService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShowServiceImpl  implements ShowService {
        private  final ShowRepository showRepository;
        private final ShowMapper showMapper;
        private final MovieRepository movieRepository;
        private  final ScreenRepository screenRepository;
    @Override
    public ShowResponseDto addShow(ShowRequestDto requestDto) {
        Movie movie=movieRepository.findById(requestDto.getMovieId())
                .orElseThrow(()->new ResourceNotFoundException("Movie Not Found"));
        Screen screen=screenRepository.findById(requestDto.getScreenId())
                .orElseThrow(()->new ResourceNotFoundException("Screen Not Found"));
        Show show=showMapper.toEntity(requestDto,movie,screen);
        Show savedShow=showRepository.save(show);


        return showMapper.todto(savedShow);
    }


    @Override
    public Page<ShowResponseDto> getAllShow(int page, int size, String sortBy, String sortDir) {
        Sort sort=sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortDir).descending();

        Pageable pageable= PageRequest.of(page,size,sort);
        Page<Show>pages=showRepository.findAll(pageable);
        return  pages.map(showMapper::todto);
    }



    @Override
    public ShowResponseDto getShowByid(Long id) {
        Show show=showRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Show not found"+id));
        return showMapper.todto(show);
    }

    @Override
    public ShowResponseDto updateShow(Long id, ShowRequestDto requestDto) {
        Show show=showRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Show Not Found"+id));
        Movie movie =movieRepository.findById(show.getMovie().getId()).orElseThrow(()->new ResourceNotFoundException("Movie Not Found"+id));
        Screen screen=screenRepository.findById(show.getScreen().getId()).orElseThrow(()->new ResourceNotFoundException("Screen Not Found"+id));
        show.setShowDate(requestDto.getShowDate());
        show.setStartTime(requestDto.getStartTime());
        show.setEndTime(requestDto.getEndTime());
        show.setIsActive(requestDto.getIsActive());
        show.setTicketPrice(requestDto.getTicketPrice());
        show.setAvailableSeats(requestDto.getAvailableSeats());

        show.setMovie(movie);
        show.setScreen(screen);
        Show savedShow=showRepository.save(show);
        return showMapper.todto(savedShow);
    }
//soft delete
    @Override
    public void deleteShow(Long id) {
        Show show=showRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Show not found"));
        show.setIsActive(false);
        showRepository.save(show);

    }
//activate shows
    @Override
    public ShowResponseDto activateShows(Long id) {
        Show show=showRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Show Not Found"));
        show.setIsActive(true);
      Show saveupdatedshow=  showRepository.save(show);
        return showMapper.todto(saveupdatedshow);
    }

    @Override
    public List<ShowResponseDto> allShows() {
        return showRepository.findAll().stream().map(showMapper::todto).toList();
    }

    //search shows by movie id
    @Override
    public List<ShowResponseDto> searchByMovie(Long movieId) {

        return showRepository.findByMovieId(movieId).stream().map(showMapper::todto).toList();
    }

    //search shows by screen id
    @Override
    public List<ShowResponseDto> searchByScreen(Long screenId) {
        return showRepository.findByScreenId(screenId).stream().map(showMapper::todto).toList();
    }

    //search shows by shows Date
    @Override
    public List<ShowResponseDto> searchByShowsDate(LocalDate date) {
        return showRepository.findByshowDate(date).stream().map(showMapper::todto).toList();
    }

    //get the shows by the show time
    @Override
    public List<ShowResponseDto> searchByShowsTime(LocalTime time) {
        return showRepository.findByStartTime(time).stream().map(showMapper::todto).toList();
    }

    //get the active shows only
    @Override
    public List<ShowResponseDto> getActiveShows() {
        return showRepository.findByIsActiveTrue().stream().map(showMapper::todto).toList();
    }

    //get the upcoming shows by todays date

    @Override
    public List<ShowResponseDto> getUpcomingshows() {
        return showRepository.findByShowDateAfter(LocalDate.now()).stream().map(showMapper::todto).toList() ;
    }

    //get the todays shows

    @Override
    public List<ShowResponseDto> getTodaysShows() {
        return showRepository.findByshowDate(LocalDate.now()).stream().map(showMapper::todto).toList();
    }

    @Override
    public Long countActiveShows() {
        return showRepository.countByIsActiveTrue();
    }



}
