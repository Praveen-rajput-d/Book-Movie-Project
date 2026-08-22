package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.request.PaymentRequestDto;
import com.cinebook.cinebook.dto.response.PaymentResponseDto;
import com.cinebook.cinebook.entity.*;
import com.cinebook.cinebook.enums.*;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.mail.service.EmailService;
import com.cinebook.cinebook.mapper.PaymentMapper;
import com.cinebook.cinebook.repository.*;
import com.cinebook.cinebook.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl  implements PaymentService {
   private  final PaymentRepository paymentRepository;
   private  final BookingRepository bookingRepository;
   private final PaymentMapper paymentMapper;
   private  final UserRepository userRepository;
   private  final BookingSeatRepository bookingSeatRepository;
   private  final TicketRepository ticketRepository;
   private final EmailService emailService;

    @Override
    public PaymentResponseDto processPayment(PaymentRequestDto request) {


        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking Not Found"));



        if(booking.getBookingStatus()==BookingStatus.CONFIRMED){
            throw  new RuntimeException("Booking already paid");
        }
         if(booking.getBookingStatus()==BookingStatus.CANCELLED){
             throw new RuntimeException("Booking has Expired");
         }

        Payment payment=new Payment();
         payment.setBooking(booking);
         payment.setAmount(booking.getTotalAmount());
         payment.setPaymentMethod(request.getPaymentMethod());
          String trandactionid= UUID.randomUUID().toString();
          payment.setTransactionId(trandactionid);
          payment.setPaymentStatus(PaymentStatus.SUCCESS);
          payment.setPaymentTime(LocalDateTime.now());
          booking.setBookingStatus(BookingStatus.CONFIRMED);
          List<BookingSeat>bookingSeats=bookingSeatRepository.findByBooking(booking);
          for(BookingSeat bookingSeat:bookingSeats){
              bookingSeat.setBookingSeatStatus(BookingSeatStatus.CONFIRMED);
          }
          bookingSeatRepository.saveAll(bookingSeats);
        Ticket ticket=Ticket.builder()
                .ticketNumber("TKT"+System.currentTimeMillis())
                .booking(booking)
                .ticketStatus(TicketStatus.ACTIVE)
                .generatedAt(LocalDateTime.now())
                .build();




          bookingRepository.save(booking);
        Payment savedPayment=paymentRepository.save(payment);
        ticketRepository.save(ticket);
        emailService.sendEmailConfirmation(ticket);

        return paymentMapper.todto(savedPayment);
    }

    @Override
    public Page<PaymentResponseDto> getAllpayment(int page, int size, String sortBy, String sortDir) {
        Sort sort=sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable= PageRequest.of(page,size,sort);
        Page<Payment>pages=paymentRepository.findAll(pageable);
        return pages.map(paymentMapper::todto);
    }

    @Override
    public List<PaymentResponseDto> getAllMyPayments() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        List<Payment>payments=paymentRepository.findByBookingUserId(user.getId());
        return payments.stream().map(paymentMapper::todto).toList();
    }

    @Override
    public PaymentResponseDto getPaymentById(Long paymentId) {
        Payment payments=paymentRepository.findById(paymentId).orElseThrow(()->new ResourceNotFoundException("Payment Not Found with this paymentId"+paymentId));

        return paymentMapper.todto(payments);
    }

    @Override
    public List<PaymentResponseDto> searchPaymentByStatus(PaymentStatus paymentStatus) {
        List<Payment>payments=paymentRepository.findByPaymentStatus(paymentStatus);
        return payments.stream().map(paymentMapper::todto).toList();
    }

    @Override
    public List<PaymentResponseDto> searchPaymentByMethod(PaymentMethod paymentMethod) {
        List<Payment>payments=paymentRepository.findByPaymentMethod(paymentMethod);
        return payments.stream().map(paymentMapper::todto).toList();
    }

    @Override
    public PaymentResponseDto searchPaymentByTransactionId(String transactionId) {
        Payment payment=paymentRepository.findByTransactionId(transactionId).orElseThrow(()->new ResourceNotFoundException("Payment Not Found"));
        return paymentMapper.todto(payment);
    }

    @Override
    public PaymentResponseDto searchPaymentByBookingId(Long BookingId) {
        Payment payment=paymentRepository.findByBookingId(BookingId).orElseThrow(()->new ResourceNotFoundException("Payment Not Found"));
        return paymentMapper.todto(payment);
    }

    @Override
    public Double getTotalRevenue() {
        return paymentRepository.TotalRevenue();
    }

    @Override
    public List<PaymentResponseDto> filterPaymentByDate(LocalDateTime statDate, LocalDateTime endDate) {
        List<Payment>payments=paymentRepository.findByPaymentTimeBetween(statDate,endDate);
        return payments.stream().map(paymentMapper::todto).toList();
    }

    @Override
    public Long countSuccessfulPayment() {
        return paymentRepository.countByPaymentStatus(PaymentStatus.SUCCESS);
    }

    @Override
    public Long countFailedPayment() {
        return paymentRepository.countByPaymentStatus(PaymentStatus.FAILED);
    }


}
