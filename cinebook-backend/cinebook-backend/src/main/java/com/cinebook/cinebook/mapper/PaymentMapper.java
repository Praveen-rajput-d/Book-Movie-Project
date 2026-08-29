package com.cinebook.cinebook.mapper;

import com.cinebook.cinebook.dto.response.PaymentResponseDto;
import com.cinebook.cinebook.entity.Booking;
import com.cinebook.cinebook.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {
    //Entity->toDto
    public PaymentResponseDto todto(Payment payment){
       PaymentResponseDto dto=new PaymentResponseDto();
       dto.setId(payment.getId());
       dto.setPaymentMethod(payment.getPaymentMethod());
       dto.setPaymentStatus(payment.getPaymentStatus());
       dto.setPaymentTime(payment.getPaymentTime());
       dto.setAmount(payment.getAmount());
       dto.setTransactionId(payment.getTransactionId());
       dto.setQrCode(payment.getQrCode());
       dto.setBookingNumber(payment.getBooking().getBookingNumber());
       return dto;


    }

}
