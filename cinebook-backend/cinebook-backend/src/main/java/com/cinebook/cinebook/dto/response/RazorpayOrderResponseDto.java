package com.cinebook.cinebook.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RazorpayOrderResponseDto {
    private  String orderId;
    private  Long amount;
    private  String currency;
}
