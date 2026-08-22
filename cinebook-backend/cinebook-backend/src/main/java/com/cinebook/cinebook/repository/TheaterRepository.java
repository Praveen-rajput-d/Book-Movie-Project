package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.entity.Movie;
import com.cinebook.cinebook.entity.Theater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TheaterRepository extends JpaRepository<Theater,Long> {
    List<Theater>findByNameContainingIgnoreCase(String title);
    List<Theater>findByCityIgnoreCase(String city);

    List<Theater>findByStateIgnoreCase(String state);
    List<Theater>findByActiveTrue();
    List<Theater>findByPincodeIgnoreCase(String pincode);

    List<Theater>findByTotalScreenGreaterThanEqual(int totalScreen);

     long countByActiveTrue();
}
