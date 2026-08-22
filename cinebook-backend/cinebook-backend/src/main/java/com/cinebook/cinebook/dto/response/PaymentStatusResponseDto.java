package com.cinebook.cinebook.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentStatusResponseDto {
    private String status;
    private Long totalBooking;
}
