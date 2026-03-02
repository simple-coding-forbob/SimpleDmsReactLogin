package com.simplecoding.simpledmsreactlogin.common.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PdfDto {

    private String title;
    private String content;
    private String fileName;
    private String dname;
    private String job;
    private String ename;
    private Long drafter;     // 기안자 사번 (Emp.eno)
    private String approval1;
    private String approval2;
}
