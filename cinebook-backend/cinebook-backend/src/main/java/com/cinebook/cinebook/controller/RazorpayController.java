package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.request.RazorpayPaymentVerifyRequestDto;
import com.cinebook.cinebook.dto.request.RazorpayRequestDto;
import com.cinebook.cinebook.dto.response.RazorpayOrderResponseDto;
import com.cinebook.cinebook.dto.response.RazorpayPaymentVerifyResponseDto;
import com.cinebook.cinebook.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class RazorpayController {
    private final PaymentService paymentService;
    @PostMapping("/razorpay/create-order")
    public ResponseEntity<RazorpayOrderResponseDto>createRazorpayOrder(
            @Valid @RequestBody RazorpayRequestDto request
    ){
        return ResponseEntity.ok(
                paymentService.createRazorpayOrder(request.getBookingId())
        );
    }
    @PostMapping("/razorpay/verify")
    public ResponseEntity<RazorpayPaymentVerifyResponseDto>verifypayment(@Valid @RequestBody RazorpayPaymentVerifyRequestDto request){
        return  ResponseEntity.ok(paymentService.verifyRazorpayPayment(request));
    }
}
