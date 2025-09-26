package com.simplecoding.simpledmsreactlogin.gallery.dto;

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
    private String galleryTitle;   // 제목
    private byte[] galleryData;
    private String galleryFileUrl;  // 파일 다운로드 url

    //  TODO: GalleryRepository sql 시 사용
    public GalleryDto(String uuid, String galleryTitle, String galleryFileUrl) {
        this.uuid = uuid;
        this.galleryTitle = galleryTitle;
        this.galleryFileUrl = galleryFileUrl;
    }

    //  TODO: GalleryController save 시 사용
    public GalleryDto(String galleryTitle, MultipartFile galleryData) throws Exception {
        this.galleryTitle = galleryTitle;
        this.galleryData= (galleryData!=null)? galleryData.getBytes() : null;
    }
}
