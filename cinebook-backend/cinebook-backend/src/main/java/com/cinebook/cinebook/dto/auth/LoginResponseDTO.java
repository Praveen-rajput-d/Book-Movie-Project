package com.cinebook.cinebook.dto.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {
//    private long id;
//    private String firstName;
//    private String email;
//    private String role;
//    private String message;

    private String token;
    private  String type;
    private  String email;
    private String role;
    private String message;
}
