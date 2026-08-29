package com.cinebook.cinebook.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ScreenResponseDto {
    private Long id;
   private  String screenName;
   private String screenType;
   private  Integer capacity;
   private Boolean active;
   private Long theaterId;
   private String theaterName;
   private LocalDateTime createdAt;
   private LocalDateTime updatedAt;
}
