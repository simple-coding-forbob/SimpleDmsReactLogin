package com.simplecoding.simpledmsreactlogin.gallery.service;

import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.gallery.dto.GalleryDto;
import com.simplecoding.simpledmsreactlogin.gallery.entity.Gallery;
import com.simplecoding.simpledmsreactlogin.gallery.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    // 검색 + 전체조회 + 페이징
    public Page<GalleryDto> selectGalleryList(String searchKeyword, Pageable pageable) {
        return galleryRepository.selectGalleryList(searchKeyword, pageable);
    }

    // 저장 (파일 첨부 선택 가능)
    public void save(GalleryDto galleryDto) throws Exception {
        Gallery gallery = mapStruct.toEntity(galleryDto);

        String uuid = UUID.randomUUID().toString();
        gallery.setUuid(uuid);

        if (galleryDto.getFileData() != null) { // 파일 첨부가 있을 때만 처리
            String downloadURL = commonUtil.generateUrl("gallery", uuid);
            gallery.setGalleryFileUrl(downloadURL);
            commonUtil.saveFile(galleryDto.getFileData(), uuid); // 업로드 폴더에 파일 저장
        }

        galleryRepository.save(gallery);
    }

    // 상세조회
    public Gallery findById(String uuid) {
        return galleryRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
    }

    // 삭제 (DB + 파일 삭제)
    public void deleteById(String uuid) {
        commonUtil.deleteFile(uuid); // 서버 파일 삭제
        galleryRepository.deleteById(uuid); // DB 삭제
    }
}
