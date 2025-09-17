package com.simplecoding.simpledmsreactlogin.filedb.dto;

import lombok.*;

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
    private String fileUrl;     // 파일 다운로드 url

    public FileDbDto(String fileTitle, String fileContent) {
        this.fileTitle = fileTitle;
        this.fileContent = fileContent;
    }
}
