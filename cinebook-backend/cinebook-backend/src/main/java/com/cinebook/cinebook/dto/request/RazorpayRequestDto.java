package com.cinebook.cinebook.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RazorpayRequestDto {
    @NotNull
    private  long bookingId;

}
