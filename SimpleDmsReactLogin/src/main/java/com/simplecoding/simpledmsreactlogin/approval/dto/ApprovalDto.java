package com.simplecoding.simpledmsreactlogin.approval.dto;

import com.simplecoding.simpledmsreactlogin.common.enums.ApprovalStatus;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "aid")
public class ApprovalDto {
    private Long aid;
    private Long docId;                            // fk: Document
    private String title;                           //     Document
    private Long approver;                          // fk: Emp
    private Integer seq;
    private ApprovalStatus status=ApprovalStatus.P; // P:대기, A:승인, R:반려, C:완료
    private LocalDateTime approveTime;
    private String note;
}
