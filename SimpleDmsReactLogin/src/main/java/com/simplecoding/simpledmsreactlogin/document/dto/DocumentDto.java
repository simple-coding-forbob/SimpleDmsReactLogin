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
    private Long drafter;
    private byte[] fileData; // 파일 데이터까지 포함
    private String fileUrl;

//    TODO: DocumentRepository 에서 사용
    public DocumentDto(String uuid, String title, String content, Long drafter, String fileUrl) {
        this.uuid = uuid;
        this.title = title;
        this.content = content;
        this.drafter = drafter;
        this.fileUrl = fileUrl;
    }

    //  TODO: DocumentController save 시 사용
    public DocumentDto(String title, String content, Long drafter, MultipartFile fileData) throws Exception {
        this.title = title;
        this.content = content;
        this.drafter = drafter;
        this.fileData= (fileData!=null)? fileData.getBytes() : null;
    }
}
