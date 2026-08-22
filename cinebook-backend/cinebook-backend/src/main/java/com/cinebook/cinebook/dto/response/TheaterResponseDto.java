package com.cinebook.cinebook.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@Builder
public class TheaterResponseDto {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private  Integer  totalScreen;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
