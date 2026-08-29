package com.cinebook.cinebook.dto.response.UserProfileResponse;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponseDto {
    private  long id;
    private String firstName;
    private String lastName;
    private  String email;
    private String phone;
    private String role;
    private LocalDate createAt;
}
