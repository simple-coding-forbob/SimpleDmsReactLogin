package com.simplecoding.simpledmsreactlogin.approval.dto;

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
    private String uuid;                 // fk: Document
    private String title;                //     Document
    private Long eno;                    // fk: Emp
    private Integer seq;
    private String status;
    private LocalDateTime approveTime;
    private String note;
}
