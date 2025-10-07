package com.simplecoding.simpledmsreactlogin.dept.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeptDto {
    private Long dno;   // 부서번호(기본키)
    @NotBlank
    private String  dname; // 부서명
    @NotBlank
    private String  loc;   // 부서위치
}
