package com.cinebook.cinebook.dto.response;

import com.cinebook.cinebook.enums.TicketStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponseDto {
    private Long id;
    private  String ticketNumber;
    private  String bookingNumber;
    private String movieName;
    private String theatreName;
    private String screenName;
    private LocalDate showDate;
    private LocalTime showTime;
    private List<String>seatNumbers;
    private Double totalAmount;
    private TicketStatus ticketStatus;
    private LocalDateTime generatedAt;
    private  String qrCode;
}
