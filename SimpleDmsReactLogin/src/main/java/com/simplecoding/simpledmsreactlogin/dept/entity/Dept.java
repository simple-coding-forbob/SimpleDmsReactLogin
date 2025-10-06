package com.simplecoding.simpledmsreactlogin.dept.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_DEPT")
@SequenceGenerator(
        name = "SQ_DEPT_JPA",
        sequenceName = "SQ_DEPT",
        initialValue = 10,
        allocationSize = 10
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "dno", callSuper = false)
public class Dept extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_DEPT_JPA")
    private Long dno; // 부서번호(PK)
    private String dname; // 부서명
    private String loc; // 부서위치
}
