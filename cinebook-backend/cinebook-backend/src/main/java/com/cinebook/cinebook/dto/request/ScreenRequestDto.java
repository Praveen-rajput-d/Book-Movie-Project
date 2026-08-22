package com.cinebook.cinebook.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ScreenRequestDto {
    @NotBlank(message = "screen name is Required")
    private String screenName;
    @NotBlank(message = "Screen Type is required")
    private String screenType;

    @NotNull(message = "capacity is required")
    @Min(value = 1,message = "capacity must be greater than 0")
    private Integer capacity;

    @NotNull(message = "Active status is required")
    private Boolean active;

    @NotNull(message = "Theater is required")
    private Long theaterId;
}
