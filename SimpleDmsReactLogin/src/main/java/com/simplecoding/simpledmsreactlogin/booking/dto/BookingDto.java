package com.simplecoding.simpledmsreactlogin.booking.dto;


import com.simplecoding.simpledmsreactlogin.common.enums.ReservationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingDto {
    private Long bid;
    private String  email;                                // fk: Member
    private Long  pid;                                  // fk: PublicCar
    private String carName;                               // 차모델 이름(PublicCar)
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private ReservationStatus status=ReservationStatus.R;  // 코드설명, 기본(R:예약)
}
