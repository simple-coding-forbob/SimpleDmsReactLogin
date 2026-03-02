package com.simplecoding.simpledmsreactlogin.notice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NoticeDto {
    private Long nid;            // 기본키, 시퀀스
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private String isVisible;    // 기본 N
    private LocalDate startDate;
    private LocalDate endDate;
}
