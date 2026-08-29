package com.cinebook.cinebook.dto.response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RazorpayPaymentVerifyResponseDto {
    private  boolean success;
    private  String message;
}
