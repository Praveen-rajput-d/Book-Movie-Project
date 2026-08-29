package com.cinebook.cinebook.dto.response;

import com.cinebook.cinebook.enums.PaymentMethod;
import com.cinebook.cinebook.enums.PaymentStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponseDto {
    private Long id;
    private String bookingNumber;
    private PaymentStatus paymentStatus;
    private PaymentMethod paymentMethod;
    private String transactionId;
    private Double amount;
    private LocalDateTime paymentTime;
    private  String qrCode;
}
