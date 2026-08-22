package com.cinebook.cinebook.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TheaterRequestDto {
    @NotBlank(message = " Theatre name is required")
    private String name;
    @NotBlank(message = "Theatre address is required")
    private String address;
    @NotBlank(message = "City is required")
    private String city;
    @NotBlank(message = "state is required")
    private String state;
    @NotBlank(message = "pincode is required")
    private String pincode;

    @NotNull(message = "total screen of theatre is required")
    private Integer totalScreen;

}
