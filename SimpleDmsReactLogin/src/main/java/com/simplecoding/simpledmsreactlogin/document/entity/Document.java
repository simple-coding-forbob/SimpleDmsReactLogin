package com.simplecoding.simpledmsreactlogin.document.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import com.simplecoding.simpledmsreactlogin.emp.entity.Emp;
import com.simplecoding.simpledmsreactlogin.template.entity.Template;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_DOCUMENT")
@SequenceGenerator(
        name = "SQ_DOCUMENT_JPA",
        sequenceName = "SQ_DOCUMENT",
        initialValue = 1,
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "docId", callSuper = false)

public class Document extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_DOCUMENT_JPA")
    private Long docId; // 기본키(PK)
    private String title; // 문서명
    private String content; // 내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drafter") // FK: TB_EMP(ENO)
    private Emp emp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tid") // FK: TB_TEMPLATE(TID)
    private Template template;
}
