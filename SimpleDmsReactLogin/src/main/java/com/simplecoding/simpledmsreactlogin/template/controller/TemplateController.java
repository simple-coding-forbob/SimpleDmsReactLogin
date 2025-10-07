package com.simplecoding.simpledmsreactlogin.template.controller;

import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.template.dto.TemplateDto;
import com.simplecoding.simpledmsreactlogin.template.service.TemplateService;
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
@Tag(name = "TemplateController", description = "템플릿 API 문서")
@RequestMapping("/api")
public class TemplateController {

    private final TemplateService templateService;
    private final CommonUtil commonUtil;

    /**
     * 전체조회
     */
    @Operation(summary = "템플릿 전체 조회", description = "템플릿 목록을 페이징 없이 조회합니다.")
    @GetMapping("/template/all")
    public ResponseEntity<ApiResponse<List<TemplateDto>>> selectTemplateList() {

        List<TemplateDto> list = templateService.selectAll();

        ApiResponse<List<TemplateDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                list,
                0,
                0
        );
        return ResponseEntity.ok(response);
    }

    /**
     * 전체조회
     */
    @Operation(summary = "템플릿 전체 조회", description = "검색 키워드로 템플릿 목록을 조회합니다.")
    @GetMapping("/template")
    public ResponseEntity<ApiResponse<List<TemplateDto>>> selectTemplateList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable) {

        Page<TemplateDto> pages = templateService.selectTemplateList(searchKeyword, pageable);
        log.info("템플릿 전체조회 결과 : {}", pages);

        ApiResponse<List<TemplateDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 추가 (파일 업로드 포함)
    @Operation(summary = "템플릿 저장", description = "새로운 템플릿을 등록합니다.")
    @PostMapping( "/template")
    public ResponseEntity<Void> create(
            @Valid @ModelAttribute TemplateDto templateDto,
            BindingResult bindingResult
    ) throws Exception {
        commonUtil.checkBindingResult(bindingResult);  // 서버 유효성 체크(보안 강화: 프론트 우회등)
        templateService.save(templateDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "템플릿 삭제", description = "템플릿 번호로 삭제합니다. 단, 문서 테이블에서 사용 중인 경우 삭제 불가합니다.")
    @DeleteMapping("/template/{tid}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "삭제할 템플릿 번호") @PathVariable long tid) {
        templateService.deleteById(tid);
        return ResponseEntity.ok().build();
    }

    // PDF 다운로드
    @Operation(summary = "템플릿 PDF 다운로드", description = "템플릿 내용을 PDF로 생성하여 다운로드합니다.")
    @GetMapping("/template/pdf/{docId}")
    public ResponseEntity<byte[]> viewPdf(@PathVariable Long docId) throws Exception {
        byte[] pdfBytes = templateService.generatePdf(docId);

        ContentDisposition contentDisposition = ContentDisposition.inline()
                .filename("template_" + docId + ".pdf")
                .build();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString())
                .body(pdfBytes);
    }
}
