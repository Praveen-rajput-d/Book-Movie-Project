package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Repository
public interface MovieRepository extends JpaRepository<Movie,Long> {
    List<Movie>findByTitleContainingIgnoreCase(String title);
    List<Movie>findByGenreIgnoreCase(String genre);

    List<Movie>findByLanguageIgnoreCase(String language);
    List<Movie>findByIsActiveTrue();
    List<Movie> findByReleaseDateBefore(LocalDate date);

    List<Movie> findByReleaseDateAfter(LocalDate date);

    Long countByIsActiveTrue();




}
