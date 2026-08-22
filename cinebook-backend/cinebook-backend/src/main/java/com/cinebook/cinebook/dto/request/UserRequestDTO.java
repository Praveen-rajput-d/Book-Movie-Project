package com.cinebook.cinebook.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    @NotBlank(message = "First name is neccessary")
    @Size(min = 2,max = 60)
    private String firstName;
    @NotBlank(message = "Last nameis neccessary")
    @Size(min = 2,max = 60)
    private String lastName;
    @NotBlank(message = "Email is neccessary")
    @Email(message = "Invalid Email")
    private String email;
    @NotBlank(message = "Password is neccessary")
    @Size(min = 10,message = "password must contain at least 10 characters")
    private String password;
    @NotBlank(message = "phone number is required")
    @Pattern(regexp = "^[0-9]{10}$")
    private String phone;
    private long roleId;
}
