package com.simplecoding.simpledmsreactlogin.dept.entity;




import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "TB_DEPT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "dno", callSuper = false)
public class Dept extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dno;   // 부서번호(기본키)
    private String  dname; // 부서명
    private String  loc;   // 부서위치
}

