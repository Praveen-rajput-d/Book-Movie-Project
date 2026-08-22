package com.cinebook.cinebook.dto.response;

import com.cinebook.cinebook.enums.BookingStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BookingResponseDto {


    private Long id;
    private String bookingNumber;
    private String movieName;
    private String theatreName;
    private String screenName;
    private LocalDate showDate;
    private LocalTime showTime;
    private List<String>seatNumbers;
    private  Double totalAmount;
    private BookingStatus bookingStatus;
}
