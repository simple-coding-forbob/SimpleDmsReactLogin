package com.simplecoding.simpledmsreactlogin.filedb.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "TB_FILE_DB")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "uuid", callSuper = false)
public class FileDb extends BaseTimeEntity {

    @Id
    private String uuid;                                       // 기본키 : 자바에서 UUID 생성
    private String fileTitle;                                  // 제목
    private String fileContent;                                // 내용
    private String fileUrl="https://placehold.co/600x400";     // 서버에 저장된 파일 URL
}
