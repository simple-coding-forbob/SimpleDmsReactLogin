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
public class Document extends BaseTimeEntity {
    @Id
    private String uuid;        // 기본키, 시퀀스
    private String title;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drafter")
    private Emp emp;              // 업로더 사원번호
    private String fileName;
    private String fileUrl;
    @Lob
    private byte[] fileData;
}
