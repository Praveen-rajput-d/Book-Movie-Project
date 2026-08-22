package com.cinebook.cinebook.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingStatusResponseDto {
    private String status;
    private Long total;
}
