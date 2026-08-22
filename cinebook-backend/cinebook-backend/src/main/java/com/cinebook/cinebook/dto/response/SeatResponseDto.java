package com.cinebook.cinebook.dto.response;

import com.cinebook.cinebook.entity.Screen;
import com.cinebook.cinebook.enums.SeatType;
import lombok.*;
import org.hibernate.annotations.SecondaryRow;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatResponseDto {
      private Long id;
      private String seatNumber;
      private SeatType seatType;
      private  String seatRow;
      private  Boolean isActive;
      private LocalDateTime createdAt;
      private Long screenId;
      private String screenName;
      private LocalDateTime updatedAt;
}
