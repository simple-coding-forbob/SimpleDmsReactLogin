package com.simplecoding.simpledmsreactlogin.approval.dto;

import com.simplecoding.simpledmsreactlogin.common.enums.ApprovalStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    private Long docId;                             // fk: Document
    private String title;                           //     Document
    @NotNull
    private Long drafter;                           // fk: Emp(기안자)
    @NotNull
    private Long approver;                          // fk: Emp(결재자)
    @NotNull
    private Long seq;                               // 순번
    private ApprovalStatus status=ApprovalStatus.P; // P:대기, A:승인, R:반려, C:완료
    private LocalDateTime approveTime;
    private String note;
}
