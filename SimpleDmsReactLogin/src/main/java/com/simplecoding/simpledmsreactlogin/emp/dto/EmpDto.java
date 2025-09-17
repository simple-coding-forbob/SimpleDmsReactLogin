package com.simplecoding.simpledmsreactlogin.emp.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmpDto {
    private Long eno;                // 사원번호(기본키, 시퀀스)
    private String ename;               // 사원명
    private String job;                 // 직위
    private Long manager;            // 관리자사원번호
    private LocalDate hiredate;         // 입사일 (화면에서 위와 같이 전달됨, 기본값 형태이므로 생략가능)
    private Long salary;             // 급여
    private Long commission;         // 보너스(상여금)
    private Long dno;                // 부모 엔티티 클래스명
}
