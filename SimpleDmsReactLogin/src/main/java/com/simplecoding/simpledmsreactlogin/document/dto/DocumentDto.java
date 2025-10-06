package com.simplecoding.simpledmsreactlogin.document.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DocumentDto {

    private Long docId;       // 기본키 (시퀀스)
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private Long drafter;     // 기안자 사번 (Emp.eno)

    // Template id
    private Long tid;
}
