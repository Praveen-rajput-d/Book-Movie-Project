package com.cinebook.cinebook.dto.request;

import com.cinebook.cinebook.enums.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequestDto {
    @NotNull(message = "Booking Id is required")
    private Long bookingId;
    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

}
