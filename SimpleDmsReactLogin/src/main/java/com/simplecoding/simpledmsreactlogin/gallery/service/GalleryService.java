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
        Page<Gallery> page= galleryRepository.selectGalleryList(searchKeyword, pageable);
        return page.map(gallery -> mapStruct.toDto(gallery));
    }

    //    TODO: 저장/수정 : save
    public void save(GalleryDto galleryDto, byte[] galleryData) {
//        TODO: 0) DTO 값 -> Entity 로 저장
        Gallery gallery=mapStruct.toEntity(galleryDto);
        // TODO 1) UUID 만들기(기본키): 자바에서 중복안되게 만들어주는 글자(랜덤)
        String newUuid= UUID.randomUUID().toString();
//		        2) 다운로드URL 만들기(개발자 알아서)
        String downloadURL=generateDownloadUrl(newUuid);
//		        3) GalleryVO 에 위의 UUID, URL 저장(setter)
        gallery.setUuid(newUuid);
        gallery.setGalleryFileUrl(downloadURL);
        gallery.setGalleryData(galleryData);
//		        4) DB insert(galleryVO)
        galleryRepository.save(gallery);
    }

    //	다운로드 URL을 만들어주는 메소드
//	URL: 웹브라우저주소창 또는 img 태그 -> 해당하는 컨트롤러 메소드가 이미지를 전송해 줌
    public String generateDownloadUrl(String uuid) {
//		인터넷주소 체계        : http://localhost:8080/경로(path)?쿼리스트링
//		기본주소(ContextPath): http://localhost:8080
//		URL 만드는 클래스      : ServletUriComponentsBuilder
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
