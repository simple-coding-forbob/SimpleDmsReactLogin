package com.simplecoding.simpledmsreactlogin.dept.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeptDto {
    private Long dno;   // 부서번호(기본키)
    private String  dname; // 부서명
    private String  loc;   // 부서위치
}
