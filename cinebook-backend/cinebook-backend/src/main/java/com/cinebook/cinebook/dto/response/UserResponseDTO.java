package com.cinebook.cinebook.dto.response;

import com.cinebook.cinebook.enums.UserStatus;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private  String role;
    private UserStatus status;

}
