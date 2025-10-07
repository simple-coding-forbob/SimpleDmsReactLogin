package com.simplecoding.simpledmsreactlogin.gallery.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "uuid")
public class GalleryDto {
    private String uuid;            // 기본키
    @NotBlank
    private String galleryTitle;   // 제목
    private String galleryFileUrl="https://placehold.co/600x400";  // 파일 다운로드 url
    private MultipartFile fileData; // 첨부파일

    //  TODO: GalleryRepository sql 시 사용
    public GalleryDto(String uuid, String galleryTitle, String galleryFileUrl) {
        this.uuid = uuid;
        this.galleryTitle = galleryTitle;
        this.galleryFileUrl = galleryFileUrl;
    }
}
