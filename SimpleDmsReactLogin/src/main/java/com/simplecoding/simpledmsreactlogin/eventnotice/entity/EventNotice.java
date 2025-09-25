package com.simplecoding.simpledmsreactlogin.eventnotice.entity;


import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "TB_EVENT_NOTICE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "eid", callSuper = false)
public class EventNotice extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eid;            // 기본키, 시퀀스
    private String subject;
    private String text;
    private String isVisible;    // 기본 N
    private LocalDate startDate;
    private LocalDate endDate;
}
