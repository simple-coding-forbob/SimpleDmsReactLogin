package com.simplecoding.simpledmsreactlogin.eventnotice.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EventNoticeDto {
    private Long eid;            // 기본키, 시퀀스
    private String subject;
    private String text;
    private String isVisible;    // 기본 N
    private LocalDate startDate;
    private LocalDate endDate;
}
