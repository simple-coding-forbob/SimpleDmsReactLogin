package com.simplecoding.simpledmsreactlogin.faq.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FaqDto {
    private Long fno;           // 번호(기본키)
    @NotBlank
    private String title;      // 제목
    @NotBlank
    private String content;    // 내용
}
