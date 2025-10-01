package com.simplecoding.simpledmsreactlogin.approval.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import com.simplecoding.simpledmsreactlogin.common.enums.ApprovalStatus;
import com.simplecoding.simpledmsreactlogin.document.entity.Document;
import com.simplecoding.simpledmsreactlogin.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_APPROVAL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "aid", callSuper = false)
public class Approval extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aid;                                // PK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uuid")
    private Document document;                       // 문서 UUID (FK → TB_DOCUMENT.UUID)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approver")
    private Emp emp;                                 // 결재자 사원번호
    private Integer seq;
    @Enumerated(EnumType.STRING)
    private ApprovalStatus status=ApprovalStatus.P;  // P:대기, A:승인, R:반려, C:완료
    private LocalDateTime approveTime;
    private String note;
}
