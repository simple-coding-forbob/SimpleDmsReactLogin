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
@SequenceGenerator(
        name = "SQ_APPROVAL_JPA",
        sequenceName = "SQ_APPROVAL",
        initialValue = 1,
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "aid", callSuper = false)
public class Approval extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_APPROVAL_JPA")
    private Long aid;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doc_id")
    private Document document;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approver")
    private Emp emp;
    private Long seq;
    @Enumerated(EnumType.STRING)
    private ApprovalStatus status = ApprovalStatus.P;
    private LocalDateTime approveTime;
    private String note;
}
