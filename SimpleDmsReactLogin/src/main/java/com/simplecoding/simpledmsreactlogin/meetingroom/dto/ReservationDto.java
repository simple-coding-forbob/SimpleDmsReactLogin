package com.simplecoding.simpledmsreactlogin.meetingroom.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReservationDto {
    private Long rid;
    private String email;                             // 이메일(FK:TB_MEMBER)
    private Long mid;                                 // 회의실 ID(FK:TB_MEETING_ROOM)
    private String roomName;                          // 회의실 이름(TB_MEETING_ROOM)
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String  code;                             // 상수명(코드): R/C/E
    private String  description;                      // 코드설명
}
