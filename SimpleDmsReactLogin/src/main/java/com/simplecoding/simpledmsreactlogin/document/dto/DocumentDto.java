package com.simplecoding.simpledmsreactlogin.document.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DocumentDto {
    private String uuid;     // 기본키, 시퀀스
    private String title;
    private String content;
    private Long drafter;    // 업로더 사원번호
    private String fileName;
    private String fileUrl;
    private byte[] fileData; // 파일 데이터까지 포함

//    TODO: DocumentRepository 에서 사용
    public DocumentDto(String uuid, String title, String content, Long drafter, String fileName, String fileUrl) {
        this.uuid = uuid;
        this.title = title;
        this.content = content;
        this.fileName = fileName;
        this.drafter = drafter;
        this.fileUrl = fileUrl;
    }

    //  TODO: DocumentController save 시 사용
    public DocumentDto(String title, String content, String fileName, MultipartFile fileData) throws Exception {
        this.title = title;
        this.content = content;
        this.fileName = fileName;
        this.fileData= (fileData!=null)? fileData.getBytes() : null;
    }
}
