package com.simplecoding.simpledmsreactlogin.filedb.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "uuid")
public class FileDbDto {
    private String uuid;        // 기본키 : 자바생성
    private String fileTitle;   // 제목
    private String fileContent; // 내용
    private String fileName;    // 파일명
    private String fileUrl;     // 파일 다운로드 url
    private byte[] fileData;

    //  TODO: FileDbRepository sql 시 사용
    public FileDbDto(String uuid, String fileTitle, String fileContent,  String fileName, String fileUrl) {
        this.uuid = uuid;
        this.fileTitle = fileTitle;
        this.fileContent = fileContent;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
    }

    //  TODO: FileDbController save 시 사용
    public FileDbDto(String fileTitle, String fileContent, String fileName, MultipartFile fileData) throws Exception {
        this.fileTitle = fileTitle;
        this.fileContent = fileContent;
        this.fileName = fileName;
        this.fileData=fileData!=null? fileData.getBytes() : null;
    }
}
