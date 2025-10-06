package com.simplecoding.simpledmsreactlogin.emp.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import com.simplecoding.simpledmsreactlogin.dept.entity.Dept;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;

@Entity
@Table(name = "TB_EMP")
@SequenceGenerator(
        name = "SQ_EMP_JPA",
        sequenceName = "SQ_EMP",
        initialValue = 8000,
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "eno", callSuper = false)
public class Emp extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_EMP_JPA")
    private Long eno; // 사원번호(PK, 시퀀스)
    private String ename; // 사원명
    private String job; // 직위
    private Long manager; // 관리자 사원번호
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate hiredate; // 입사일
    private Long salary; // 급여
    private Long commission; // 보너스(상여금)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dno") // FK: TB_DEPT(DNO)
    private Dept dept; // 부모 엔티티
}
