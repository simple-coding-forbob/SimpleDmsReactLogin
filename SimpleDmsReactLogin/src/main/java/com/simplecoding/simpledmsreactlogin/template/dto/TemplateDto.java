package com.simplecoding.simpledmsreactlogin.template.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TemplateDto {

    private Long tid;
    @NotBlank
    private String title;
    private String content;
    private String fileName;             // jasper 디자인 템플릿 파일
    private MultipartFile fileData;

    public TemplateDto(Long tid, String title, String content, String fileName) {
        this.tid = tid;
        this.title = title;
        this.content = content;
        this.fileName = fileName;
    }
}
