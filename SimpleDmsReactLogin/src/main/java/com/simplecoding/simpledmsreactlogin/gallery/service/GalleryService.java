package com.simplecoding.simpledmsreactlogin.gallery.service;


import com.simplecoding.simpledmsreactlogin.common.ErrorMsg;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.gallery.dto.GalleryDto;
import com.simplecoding.simpledmsreactlogin.gallery.entity.Gallery;
import com.simplecoding.simpledmsreactlogin.gallery.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository; // JPA DB 객체
    private final MapStruct mapStruct;
    private final ErrorMsg errorMsg;

    //    like 검색 + 전체조회 + 페이징처리
    public Page<GalleryDto> selectGalleryList(String searchKeyword, Pageable pageable) {
        Page<GalleryDto> page= galleryRepository.selectGalleryList(searchKeyword, pageable);
        return page;
    }

    //    TODO: 저장/수정 : save
    public void save(GalleryDto galleryDto) {
        Gallery gallery=mapStruct.toEntity(galleryDto);

        String newUuid= UUID.randomUUID().toString();
        String downloadURL=generateDownloadUrl(newUuid);
        gallery.setUuid(newUuid);
        gallery.setGalleryFileUrl(downloadURL);

        galleryRepository.save(gallery);
    }

    //	다운로드 URL을 만들어주는 메소드
    public String generateDownloadUrl(String uuid) {
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()    // 기본주소 : http://localhost:8080
                .path("/api/download/gallery/{uuid}")    // 경로    : /gallery/download
                .buildAndExpand(uuid)         // 파라메터방식: uuid
                .toUriString();               // 위에꺼조합:
        // http://localhost:8080/gallery/download?uuid=uuid값
    }

    //    상세조회
    public Gallery findById(String uuid) {
        return galleryRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException(errorMsg.getMessage("errors.not.found")));
    }

    //    삭제 함수
    public void deleteById(String uuid) {
        galleryRepository.deleteById(uuid);
    }

}
