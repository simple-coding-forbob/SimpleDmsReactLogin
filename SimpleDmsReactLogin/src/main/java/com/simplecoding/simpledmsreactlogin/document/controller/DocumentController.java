package com.simplecoding.simpledmsreactlogin.document.controller;

import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.document.dto.DocumentDto;
import com.simplecoding.simpledmsreactlogin.document.entity.Document;
import com.simplecoding.simpledmsreactlogin.document.service.DocumentService;
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
@Tag(name = "DocumentController", description = "Document REST API")
@RequestMapping("/api")
public class DocumentController {

    private final DocumentService documentService;

    // 전체 조회 + 페이징
    @Operation(summary = "Document 전체 조회", description = "검색 키워드로 Document 목록을 조회합니다.")
    @GetMapping("/document")
    public ResponseEntity<ApiResponse<List<DocumentDto>>> selectDocumentList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 5) Pageable pageable
    ) {
        Page<DocumentDto> pages = documentService.selectDocumentList(searchKeyword, pageable);
        ApiResponse<List<DocumentDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 추가
    @Operation(summary = "Document 등록", description = "새로운 Document를 등록합니다.")
    @PostMapping("/document")
    public ResponseEntity<Void> create(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam Long drafter,
            @RequestParam(required = false) MultipartFile fileData
    ) throws Exception {
        DocumentDto documentDto = new DocumentDto(title, content, drafter, fileData);
        documentService.save(documentDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "Document 삭제", description = "UUID로 삭제합니다.")
    @DeleteMapping("/document/{uuid}")
    public ResponseEntity<Void> delete(@PathVariable String uuid) {
        documentService.deleteById(uuid);
        return ResponseEntity.ok().build();
    }

    // 다운로드
    @Operation(summary = "Document 다운로드", description = "UUID로 첨부파일을 다운로드합니다.")
    @GetMapping("/download/document/{uuid}")
    public ResponseEntity<byte[]> fileDownload(@PathVariable String uuid) {
        Document document = documentService.findById(uuid);

        if (document.getFileData() == null) {
            return ResponseEntity.noContent().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", document.getFileUrl());
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        return new ResponseEntity<>(document.getFileData(), headers, HttpStatus.OK);
    }
}
