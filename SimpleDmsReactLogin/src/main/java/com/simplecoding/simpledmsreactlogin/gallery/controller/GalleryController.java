package com.simplecoding.simpledmsreactlogin.gallery.controller;


import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.gallery.dto.GalleryDto;
import com.simplecoding.simpledmsreactlogin.gallery.entity.Gallery;
import com.simplecoding.simpledmsreactlogin.gallery.service.GalleryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "GalleryController", description = "갤러리 REST API")
public class GalleryController {

    private final GalleryService galleryService;

    // 전체조회
    @Operation(summary = "갤러리 전체 조회", description = "검색 키워드와 페이징을 이용하여 갤러리 목록을 조회합니다.")
    @GetMapping("/gallery")
    public ResponseEntity<ApiResponse<List<GalleryDto>>> selectGalleryList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable) {

        Page<GalleryDto> pages = galleryService.selectGalleryList(searchKeyword, pageable);
        log.info("Gallery Pages : " + pages);

        ApiResponse<List<GalleryDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 저장 (업로드)
    @Operation(summary = "갤러리 등록", description = "새로운 갤러리를 등록합니다.")
    @PostMapping("/gallery")
    public ResponseEntity<Void> insert(
            @Parameter(description = "갤러리 제목") @RequestParam(defaultValue = "") String galleryTitle,
            @Parameter(description = "첨부 이미지 파일") @RequestParam(required = false) MultipartFile galleryData) throws Exception {

        GalleryDto galleryDto = new GalleryDto(galleryTitle);
        galleryService.save(galleryDto, galleryData.getBytes());

        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "갤러리 삭제", description = "UUID로 갤러리를 삭제합니다.")
    @DeleteMapping("/gallery/{uuid}")
    public ResponseEntity<Void> deleteById(
            @Parameter(description = "삭제할 갤러리 UUID") @PathVariable String uuid) {

        galleryService.deleteById(uuid);
        return ResponseEntity.ok().build();
    }

    // 다운로드
    @Operation(summary = "갤러리 이미지 다운로드", description = "UUID로 갤러리 이미지를 다운로드합니다.")
    @GetMapping("/download/gallery/{uuid}")
    public ResponseEntity<byte[]> fileDownload(
            @Parameter(description = "다운로드할 갤러리 UUID") @PathVariable String uuid) {

        Gallery gallery = galleryService.findById(uuid);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", gallery.getUuid());
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        return new ResponseEntity<>(gallery.getGalleryData(), headers, HttpStatus.OK);
    }
}
