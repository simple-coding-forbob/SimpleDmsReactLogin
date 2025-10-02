package com.simplecoding.simpledmsreactlogin.document.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DocumentDto {

    private Long docId;          // 기본키 (시퀀스)
    private String title;
    private String content;
    private Long drafter;     // 기안자 사번 (Emp.eno)
}
