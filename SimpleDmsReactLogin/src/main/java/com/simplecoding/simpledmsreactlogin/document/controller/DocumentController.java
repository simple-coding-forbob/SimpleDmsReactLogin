package com.simplecoding.simpledmsreactlogin.document.controller;

import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.document.dto.DocumentDto;
import com.simplecoding.simpledmsreactlogin.document.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@Tag(name = "DocumentController", description = "Document REST API")
@RequestMapping("/api")
public class DocumentController {

    private final DocumentService documentService;
    private final CommonUtil commonUtil;

    // 전체 조회 + 페이징
    @Operation(summary = "Document 전체 조회", description = "검색 키워드로 Document 목록을 조회합니다.")
    @GetMapping("/document")
    public ResponseEntity<ApiResponse<List<DocumentDto>>> selectDocumentList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 5) Pageable pageable
    ) {
        Page<DocumentDto> pages = documentService.selectDocumentList(searchKeyword, pageable);
        return ResponseEntity.ok(new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        ));
    }

    // 저장
    @Operation(summary = "Document 등록", description = "새로운 Document를 등록합니다.")
    @PostMapping("/document")
    public ResponseEntity<Void> create(
            @Valid @RequestBody DocumentDto documentDto,
            BindingResult bindingResult
    ) {
        commonUtil.checkBindingResult(bindingResult);  // 서버 유효성 체크
        documentService.save(documentDto);
        return ResponseEntity.ok().build();
    }

    // 상세조회
    @Operation(summary = "Document 상세 조회", description = "Document 상세 정보를 조회합니다.")
    @GetMapping("/document/{docId}")
    public ResponseEntity<ApiResponse<DocumentDto>> findById(
            @Parameter(description = "조회할 Document ID") @PathVariable Long docId
    ) {
        DocumentDto documentDto = documentService.findById(docId);
        return ResponseEntity.ok(new ApiResponse<>(true, "조회 성공", documentDto, 0, 0));
    }

    // 삭제
    @Operation(summary = "Document 삭제", description = "결재 전 상태인 경우 Document를 삭제합니다.")
    @DeleteMapping("/document/{docId}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "삭제할 Document ID") @PathVariable Long docId
    ) {
        documentService.deleteById(docId);
        return ResponseEntity.ok().build();
    }

    // PDF 다운로드
    @Operation(summary = "Document PDF 다운로드", description = "Document 내용을 PDF로 생성하여 다운로드합니다.")
    @GetMapping("/document/pdf/{docId}")
    public ResponseEntity<byte[]> viewPdf(@PathVariable Long docId) throws Exception {
        byte[] pdfBytes = documentService.generatePdf(docId);

        ContentDisposition contentDisposition = ContentDisposition.inline()
                .filename("document_" + docId + ".pdf")
                .build();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString())
                .body(pdfBytes);
    }
}
