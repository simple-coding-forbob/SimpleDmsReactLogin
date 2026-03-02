package com.simplecoding.simpledmsreactlogin.reservation.dto;

import com.simplecoding.simpledmsreactlogin.common.enums.ReservationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReservationDto {
    private Long rid;
    private String email;                                  // 이메일(FK:TB_MEMBER)
    @NotNull
    private Long mid;                                      // 회의실 ID(FK:TB_MEETING_ROOM)
    private String roomName;                               // 회의실 이름(TB_MEETING_ROOM)
    @NotNull
    private LocalDateTime startTime;
    @NotNull
    private LocalDateTime endTime;
    private ReservationStatus status=ReservationStatus.R;  // 코드설명, 기본(R:예약)
}
