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
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
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
            @RequestParam(required = false) MultipartFile fileData
    ) throws Exception {
        DocumentDto documentDto = new DocumentDto(title, content, fileData.getOriginalFilename(), fileData);
        documentService.save(documentDto);
        return ResponseEntity.ok().build();
    }

    // 상세조회
    @Operation(summary = "Document 상세 조회", description = "Document 상세 정보를 조회합니다.")
    @GetMapping("/document/{uuid}")
    public ResponseEntity<ApiResponse<DocumentDto>> findById(@Parameter(description = "조회할 uuid") @PathVariable String  uuid) {
        DocumentDto documentDto = documentService.findByIdToDto(uuid);

        ApiResponse<DocumentDto> response = new ApiResponse<>(true, "조회 성공", documentDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 삭제
    @Operation(summary = "Document 삭제", description = "UUID로 삭제합니다.")
    @DeleteMapping("/document/{uuid}")
    public ResponseEntity<Void> delete(@PathVariable String uuid) {
        documentService.deleteById(uuid);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Document 다운로드", description = "UUID로 첨부파일을 다운로드합니다.")
    @GetMapping("/download/document/{uuid}")
    public ResponseEntity<byte[]> fileDownload(@PathVariable String uuid) {
        Document document = documentService.findById(uuid);

        // ContentDisposition 사용 (브라우저 호환성 보장)
        ContentDisposition contentDisposition = ContentDisposition.attachment()            // 첨부파일 있음 표시
                .filename(document.getFileName(), StandardCharsets.UTF_8)                  // 첨부파일명 표시, 자동 인코딩
                .build();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)                            // 문서형식: 바이너리 파일 표시
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString())     // 첨부파일 있다고 표시, 첨부파일명(인코딩)도 표시
                .body(document.getFileData());                                              // 실제 첨부파일 전송
    }
}
