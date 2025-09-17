package com.simplecoding.simpledmsreactlogin.gallery.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "uuid")
public class GalleryDto {
    private String uuid;            // 기본키
    private String galleryTitle;   // 제목
    private String galleryFileUrl;  // 파일 다운로드 url

    public GalleryDto(String galleryTitle) {
        this.galleryTitle = galleryTitle;
    }
}
