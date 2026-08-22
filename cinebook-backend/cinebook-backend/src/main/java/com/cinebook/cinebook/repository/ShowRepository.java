package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ShowRepository extends JpaRepository<Show,Long> {
    List<Show>findByMovieId(Long movieId);//find shows bases on the movieId
    List<Show>findByScreenId(Long screenId);//find the shows bases on the screenid
    List<Show>findByshowDate(LocalDate date);//find the shows bases on the show Date
    List<Show>findByStartTime(LocalTime time);//find show bases on the start time
    List<Show>findByIsActiveTrue();//count active shows
    List<Show>findByShowDateAfter(LocalDate date);
    Long countByIsActiveTrue();


}
