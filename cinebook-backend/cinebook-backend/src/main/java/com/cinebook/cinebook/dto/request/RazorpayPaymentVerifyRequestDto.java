package com.cinebook.cinebook.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RazorpayPaymentVerifyRequestDto {
    @NotNull
    private  Long bookingId;
    @NotBlank
    private  String razorpayPaymentId;
    @NotBlank
    private  String razorpayOrderId;
    @NotBlank
    private  String razorpaySignature;
}
