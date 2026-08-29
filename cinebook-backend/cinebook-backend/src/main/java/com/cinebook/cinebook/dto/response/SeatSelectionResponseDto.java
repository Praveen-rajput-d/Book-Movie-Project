package com.cinebook.cinebook.dto.response;

import com.cinebook.cinebook.enums.SeatType;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class SeatSelectionResponseDto {
    private  Long id;
    private String seatNumber;
    private SeatType seatType;
    private  boolean booked;
}
