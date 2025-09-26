package com.simplecoding.simpledmsreactlogin.document.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
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
    private Long drafter;
    private String fileUrl;
    @Lob
    private byte[] fileData;
}
