package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.dto.request.PaymentRequestDto;
import com.cinebook.cinebook.dto.response.PaymentResponseDto;
import com.cinebook.cinebook.enums.PaymentMethod;
import com.cinebook.cinebook.enums.PaymentStatus;
import com.cinebook.cinebook.service.PaymentService;
import jakarta.persistence.PreUpdate;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private  final PaymentService paymentService;
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PostMapping
    public ResponseEntity<PaymentResponseDto>processpayment(@RequestBody PaymentRequestDto requestDto){
        PaymentResponseDto responseDto=paymentService.processPayment(requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Page<PaymentResponseDto>>geAllPayment(@RequestParam(defaultValue = "0")int page,
                                                                @RequestParam(defaultValue = "5")int size,
                                                                @RequestParam(defaultValue = "id")String sortBy,
                                                                @RequestParam(defaultValue = "asc")String sortDir){
        return ResponseEntity.ok(paymentService.getAllpayment(page,size,sortBy,sortBy));
    }
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentResponseDto>getPaymentById(@PathVariable Long paymentId){
        return ResponseEntity.ok(paymentService.getPaymentById(paymentId));
    }
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/my-payments")
    public ResponseEntity<List<PaymentResponseDto>>getMyPayments(){
        return ResponseEntity.ok(paymentService.getAllMyPayments());
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/status/{paymentStatus}")
    public ResponseEntity<List<PaymentResponseDto>>searchPaymentBystatus(@PathVariable  PaymentStatus paymentStatus){
        return ResponseEntity.ok(paymentService.searchPaymentByStatus(paymentStatus));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/method/{paymentMethod}")
    public ResponseEntity<List<PaymentResponseDto>>searchPaymentByMethod(@PathVariable PaymentMethod paymentMethod){
        return ResponseEntity.ok(paymentService.searchPaymentByMethod(paymentMethod));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/transaction/{transactionid}")
    public ResponseEntity <PaymentResponseDto> searchPaymentByTransactionId(@PathVariable String transactionid){
        return ResponseEntity.ok(paymentService.searchPaymentByTransactionId(transactionid));
    }

    //search payment by booking id
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/bookingId/{BookingId}")
    public ResponseEntity<PaymentResponseDto>searchPaymentByBookingId(@PathVariable Long BookingId){
        return ResponseEntity.ok(paymentService.searchPaymentByBookingId(BookingId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/revenue")
    public ResponseEntity<Double>GetTotalRevenue(){
        return ResponseEntity.ok(paymentService.getTotalRevenue());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/filterByDate")
    public ResponseEntity<List<PaymentResponseDto>>FilterPaymentByDate(@RequestParam LocalDateTime startDate,
                                                                       @RequestParam LocalDateTime endDate){
        return ResponseEntity.ok(paymentService.filterPaymentByDate(startDate,endDate));
    }
    @GetMapping("/SuccessPayment")
    public ResponseEntity<Long>countSuccessPayments(){
        return ResponseEntity.ok(paymentService.countSuccessfulPayment());
    }
    @GetMapping("/FailedPayment")
    public ResponseEntity<Long>countFailedPayment(){
        return ResponseEntity.ok(paymentService.countFailedPayment());
    }
}
