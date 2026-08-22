package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.entity.Screen;
import jakarta.validation.constraints.Min;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScreenRepository extends JpaRepository<Screen,Long> {
    List<Screen> findByScreenNameContainingIgnoreCase(String screenName);

    List<Screen> findByScreenTypeIgnoreCase(String screenType);

    List<Screen> findByTheaterId(Long theaterId);

    List<Screen> findByIsActiveTrue();

    long countByIsActiveTrue();
    //inactive screens
    List<Screen> findByIsActiveFalse();

    ;


}
