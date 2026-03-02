package com.simplecoding.simpledmsreactlogin.eventnotice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EventNoticeDto {
    private Long eid;            // 기본키, 시퀀스
    @NotBlank
    private String subject;
    @NotBlank
    private String text;
    @NotBlank
    private String isVisible;    // 기본 N
    private LocalDate startDate;
    private LocalDate endDate;
}
