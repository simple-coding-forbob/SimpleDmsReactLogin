package com.simplecoding.simpledmsreactlogin.document.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import com.simplecoding.simpledmsreactlogin.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_DOCUMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "id", callSuper = false)
public class Document extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB 시퀀스/auto increment
    private Long docId;             // 기본키 (시퀀스)
    private String title;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drafter") // FK: TB_EMP(ENO)
    private Emp emp;              // 기안자
}
