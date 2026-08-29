package com.cinebook.cinebook.dto.response;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUpdateResponseDto {
    @NotBlank(message = "first name is required")
    @Size(min = 2,max = 60,message = "First name must be between  2 and 60 characters")
    private  String firstName;
    @NotBlank(message = "first name is required")
    @Size(min = 2,max = 60,message = "First name must be between  2 and 60 characters")
    private  String lastName;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email")
    private  String email;
    @NotBlank(message = "phone is required")
    @Pattern(regexp = "^[0-9]{10}$",message = "Phone number must contain exactly 10 digits")
    private  String phone;
}
