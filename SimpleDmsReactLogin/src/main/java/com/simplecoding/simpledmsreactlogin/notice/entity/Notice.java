package com.simplecoding.simpledmsreactlogin.notice.entity;


import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "TB_NOTICE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "nid", callSuper = false)
public class Notice extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nid;            // 기본키, 시퀀스
    private String title;
    private String content;
    private String isVisible;    // 기본 N
    private LocalDate startDate;
    private LocalDate endDate;
}
