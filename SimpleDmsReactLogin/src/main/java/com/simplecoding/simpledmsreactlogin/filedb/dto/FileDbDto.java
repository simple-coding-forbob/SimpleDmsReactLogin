package com.simplecoding.simpledmsreactlogin.filedb.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "uuid")
public class FileDbDto {

    private String uuid;        // 기본키 : 자바에서 UUID 생성
    @NotBlank
    private String fileTitle;   // 제목
    @NotBlank
    private String fileContent; // 내용
    private String fileUrl="https://placehold.co/600x400";     // 서버에 저장된 파일 URL
    private MultipartFile fileData; // 첨부파일

//    repository 에서 사용
    public FileDbDto(String uuid, String fileTitle, String fileContent, String fileUrl) {
        this.uuid = uuid;
        this.fileTitle = fileTitle;
        this.fileContent = fileContent;
        this.fileUrl = fileUrl;
    }
}
