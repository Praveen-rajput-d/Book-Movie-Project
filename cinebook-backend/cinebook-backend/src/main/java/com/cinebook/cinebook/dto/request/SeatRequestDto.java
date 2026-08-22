package com.cinebook.cinebook.dto.request;

import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.enums.SeatType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatRequestDto {
    @NotBlank(message = "Seat Number is required")
      private  String seatNumber;
    @NotNull(message = "seat Type is required")
    private SeatType seatType;
    @NotBlank(message = "Seat Row is required")
    private  String seatRow;
    @NotNull(message = "message is required")
    private Long screenId;
    @NotNull(message = "Active status is required")
    private Boolean isActive;

}
