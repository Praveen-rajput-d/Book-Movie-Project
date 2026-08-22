package com.cinebook.cinebook.dto.request;

import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequestDto {
    private Long showId;
    private List<Long>seatIds;
}
