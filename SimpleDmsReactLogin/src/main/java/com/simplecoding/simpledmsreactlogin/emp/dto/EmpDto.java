package com.simplecoding.simpledmsreactlogin.emp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmpDto {
    private Long eno;                // 사원번호(기본키, 시퀀스)
    @NotBlank
    private String ename;               // 사원명
    @NotBlank
    private String job;                 // 직위
    @NotBlank
    private Long manager;            // 관리자사원번호
    @NotBlank
    private LocalDate hiredate;         // 입사일 (화면에서 위와 같이 전달됨, 기본값 형태이므로 생략가능)
    @NotBlank
    private Long salary;             // 급여
    @NotBlank
    private Long commission;         // 보너스(상여금)
    @NotBlank
    private Long dno;                // 부모 엔티티 클래스명
}
