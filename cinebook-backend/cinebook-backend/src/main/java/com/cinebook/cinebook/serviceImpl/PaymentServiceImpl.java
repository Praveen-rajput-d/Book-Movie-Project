package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.dto.request.PaymentRequestDto;
import com.cinebook.cinebook.dto.request.RazorpayPaymentVerifyRequestDto;
import com.cinebook.cinebook.dto.response.PaymentResponseDto;
import com.cinebook.cinebook.dto.response.RazorpayOrderResponseDto;
import com.cinebook.cinebook.dto.response.RazorpayPaymentVerifyResponseDto;
import com.cinebook.cinebook.entity.*;
import com.cinebook.cinebook.enums.*;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.mail.service.EmailService;
import com.cinebook.cinebook.mapper.PaymentMapper;
import com.cinebook.cinebook.repository.*;
import com.cinebook.cinebook.service.PaymentService;
import com.cinebook.cinebook.service.QrCocdeService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
   private  final QrCocdeService qrCocdeService;
   private  final RazorpayClient razorpayClient;
    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

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

          String paymenetqrdata="BookMovie Payment\n"+
                  "Booking:"+booking.getBookingNumber()+"\n"+
                  "Transaction:"+trandactionid+"\n"+
                  "Amount:₹"+booking.getTotalAmount()+"\n"+
                  "Payment Method:"+request.getPaymentMethod()+"\n"+
                  "Status:SUCCESS";
          String paymentQrCode=qrCocdeService.generateQrCode(paymenetqrdata);

          payment.setQrCode(paymentQrCode);

          booking.setBookingStatus(BookingStatus.CONFIRMED);



          List<BookingSeat>bookingSeats=bookingSeatRepository.findByBooking(booking);
          for(BookingSeat bookingSeat:bookingSeats){
              bookingSeat.setBookingSeatStatus(BookingSeatStatus.CONFIRMED);
          }
          bookingSeatRepository.saveAll(bookingSeats);
          String ticketNumber=
                  "TKT-"+LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE)+"-"+
                          UUID.randomUUID().toString().substring(0,6).toUpperCase();

        String ticketQrData =
                "BookMovie Ticket\n" +
                        "Ticket: " + ticketNumber + "\n" +
                        "Booking: " + booking.getBookingNumber() + "\n" +
                        "Movie: " +
                        booking.getShow()
                                .getMovie()
                                .getTitle() + "\n" +
                        "Theatre: " +
                        booking.getShow()
                                .getScreen()
                                .getTheater()
                                .getName() + "\n" +
                        "Date: " +
                        booking.getShow()
                                .getShowDate() + "\n" +
                        "Time: " +
                        booking.getShow()
                                .getStartTime();
        String ticketqrCode=qrCocdeService.generateQrCode(ticketQrData);



        Ticket ticket=Ticket.builder()
                .ticketNumber(ticketNumber)
                .booking(booking)
                .ticketStatus(TicketStatus.ACTIVE)
                .generatedAt(LocalDateTime.now())
                .qrCode(ticketqrCode)
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

    @Override
    public List<PaymentResponseDto> allPayments() {
        return paymentRepository.findAll().stream().map(paymentMapper::todto).toList();
    }

    @Override
    public RazorpayOrderResponseDto createRazorpayOrder(Long bookingId) {
        Booking booking=bookingRepository.findById(bookingId)
                .orElseThrow(()->new ResourceNotFoundException("Booking Not Found"));
        if(booking.getBookingStatus()==BookingStatus.CONFIRMED){
            throw  new RuntimeException("Booking already confirmed");
        }

        try{
            Double totalAmount=booking.getTotalAmount();
            if(totalAmount==null||totalAmount<=0){
                throw  new RuntimeException(
                        "Invalid booking amount:"+totalAmount
                );
            }
            //conver the inr to paise
            long amountInpaise=Math.round(totalAmount*100);
            System.out.println(
                    "Booking Amount INR:"+totalAmount
            );
            System.out.println(
                    "Razorpay Amount Paise:"+amountInpaise
            );
            JSONObject orderRequest=new JSONObject();

            orderRequest.put(
                    "amount",
                    amountInpaise
            );
            orderRequest.put("currency","INR");
            orderRequest.put(
                    "receipt",
                    "Booking_"+booking.getId()
            );
            System.out.println("Razor Order Request:"+orderRequest);
            Order order=razorpayClient.orders.create(orderRequest);
            System.out.println("Razorpay Order Created:"+order);
            return RazorpayOrderResponseDto.builder()
                    .orderId(order.get("id"))
                    .amount(((Number)order.get("amount")).longValue())
                    .currency(order.get("currency"))

                    .build();
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException(
                    "Unable to create RazorPayorder",e
            );

        }

    }

    @Override
    @Transactional
    public RazorpayPaymentVerifyResponseDto verifyRazorpayPayment(RazorpayPaymentVerifyRequestDto request) {

        try{
            Booking booking=bookingRepository.findById(request.getBookingId()).orElseThrow(()->new ResourceNotFoundException("Booking Not Found")
            );
            if(booking.getBookingStatus()==BookingStatus.CONFIRMED){
                throw  new RuntimeException("Booking already confirmed");
            }
            String payload=request.getRazorpayOrderId()+
                    "|"+request.getRazorpayPaymentId();

            boolean isValid= Utils.verifySignature(payload,
                    request.getRazorpaySignature(),
                    razorpayKeySecret);
            if(!isValid){
                throw new RuntimeException("Invalid Razorpay Payment signature");
            }
            //payment verified for the payment getway
            //payment is genuine from this point
            booking.setBookingStatus(BookingStatus.CONFIRMED);
            List<BookingSeat>bookingSeats=bookingSeatRepository.findByBooking(booking);

            for(BookingSeat bookingSeat:bookingSeats){
                bookingSeat.setBookingSeatStatus(BookingSeatStatus.CONFIRMED);
            }
            bookingSeatRepository.saveAll(bookingSeats);
            //create payment
            Payment payment=new Payment();
            payment.setBooking(booking);
            payment.setAmount(booking.getTotalAmount());
            payment.setPaymentMethod(PaymentMethod.UPI);
            payment.setTransactionId(request.getRazorpayPaymentId());
            payment.setPaymentStatus(PaymentStatus.SUCCESS);
            payment.setPaymentTime(LocalDateTime.now());

            bookingRepository.save(booking);
            Payment savepayment=paymentRepository.save(payment);

            Ticket ticket=Ticket.builder()
                    .ticketNumber("TKT-"+UUID.randomUUID()
                            )
                    .booking(booking).ticketStatus(TicketStatus.ACTIVE)
                    .generatedAt(LocalDateTime.now())
                    .build();
            Ticket savedticket=ticketRepository.save(ticket);
            emailService.sendEmailConfirmation(savedticket);
            return  RazorpayPaymentVerifyResponseDto.builder()
                    .success(true)
                    .message("Payment Verified Successfully")
                    .build();

        }catch(Exception e){
            throw  new RuntimeException("Payment Verification Failed",e);

        }

    }


}
