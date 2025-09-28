package com.simplecoding.simpledmsreactlogin.filedb.entity;


import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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

    //    TB_FILE_DB : 컬럼과 일치하게 속성 작성
    @Id
    private String uuid;        // 기본키 : 자바생성
    private String fileTitle;   // 제목
    private String fileContent; // 내용
    private String fileName;    // 파일명
    @Lob
    private byte[] fileData;    // 업로드 이미지
    private String fileUrl;     // 파일 다운로드 url
}

