package com.cinebook.cinebook.repository;

import com.cinebook.cinebook.entity.User;
import com.cinebook.cinebook.enums.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User>findByEmail(String email);
    List<User>findByStatus(UserStatus status);
    Optional<User>findByPhone(String phone);
}
