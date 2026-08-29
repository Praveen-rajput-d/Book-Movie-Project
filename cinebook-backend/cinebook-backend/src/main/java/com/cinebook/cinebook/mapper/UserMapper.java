package com.cinebook.cinebook.mapper;

import com.cinebook.cinebook.dto.response.UserProfileResponse.UserProfileResponseDto;
import com.cinebook.cinebook.dto.response.UserResponseDTO;
import com.cinebook.cinebook.entity.User;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class UserMapper {
    public UserProfileResponseDto todto(User user){
        return UserProfileResponseDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().getName())
                .createAt(LocalDate.now())

                .build();

    }
    public UserResponseDTO todtoadmin(User user){
        return  UserResponseDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().getName())
                .status(user.getStatus()).build();

    }
}
