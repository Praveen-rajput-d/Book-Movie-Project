package com.cinebook.cinebook.service;

import com.cinebook.cinebook.dto.request.PaymentRequestDto;
import com.cinebook.cinebook.dto.request.RazorpayPaymentVerifyRequestDto;
import com.cinebook.cinebook.dto.request.RazorpayRequestDto;
import com.cinebook.cinebook.dto.response.PaymentResponseDto;
import com.cinebook.cinebook.dto.response.RazorpayOrderResponseDto;

import com.cinebook.cinebook.dto.response.RazorpayPaymentVerifyResponseDto;
import com.cinebook.cinebook.entity.Payment;
import com.cinebook.cinebook.enums.PaymentMethod;
import com.cinebook.cinebook.enums.PaymentStatus;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface PaymentService {
    PaymentResponseDto processPayment(PaymentRequestDto request);
    Page<PaymentResponseDto> getAllpayment(int page, int size, String sortBy, String sortDir);
      List<PaymentResponseDto>getAllMyPayments();
      PaymentResponseDto getPaymentById(Long paymentId);
      List<PaymentResponseDto>searchPaymentByStatus(PaymentStatus paymentStatus);
      List<PaymentResponseDto>searchPaymentByMethod(PaymentMethod paymentMethod);
      PaymentResponseDto searchPaymentByTransactionId(String transactionId);
      PaymentResponseDto searchPaymentByBookingId(Long BookingId);
      Double getTotalRevenue();
      List<PaymentResponseDto>filterPaymentByDate(LocalDateTime statDate,LocalDateTime endDate);
      Long countSuccessfulPayment();
      Long countFailedPayment();

      List<PaymentResponseDto>allPayments();
      //for the razorpay payment gateway
     RazorpayOrderResponseDto createRazorpayOrder(Long bookingId);
     RazorpayPaymentVerifyResponseDto verifyRazorpayPayment(RazorpayPaymentVerifyRequestDto request);
}
