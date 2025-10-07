package com.simplecoding.simpledmsreactlogin.faq.controller;


import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.faq.dto.FaqDto;
import com.simplecoding.simpledmsreactlogin.faq.service.FaqService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.Bidi;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@Tag(name = "FaqController", description = "FAQ REST API")
@RequestMapping("/api") // 공통 URL /api 적용
public class FaqController {

    private final FaqService faqService;
    private final CommonUtil commonUtil;

    // 전체 조회 + 페이징
    @Operation(summary = "FAQ 전체 조회", description = "검색 키워드로 FAQ 목록을 조회합니다.")
    @GetMapping("/faq")
    public ResponseEntity<ApiResponse<List<FaqDto>>> selectFaqList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable
    ) {
        Page<FaqDto> pages = faqService.selectFaqList(searchKeyword, pageable);
        ApiResponse<List<FaqDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 단일 FAQ 조회
    @Operation(summary = "FAQ 상세 조회", description = "FAQ 번호로 상세 정보를 조회합니다.")
    @GetMapping("/faq/{fno}")
    public ResponseEntity<ApiResponse<FaqDto>> findById(
            @Parameter(description = "조회할 FAQ 번호") @PathVariable long fno
    ) {
        FaqDto faqDto = faqService.findById(fno);
        ApiResponse<FaqDto> response = new ApiResponse<>(true, "조회 성공", faqDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 추가
    @Operation(summary = "FAQ 등록", description = "새로운 FAQ를 등록합니다.")
    @PostMapping("/faq")
    public ResponseEntity<Void> create(@Valid @RequestBody FaqDto faqDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        faqService.save(faqDto);
        return ResponseEntity.ok().build();
    }

    // 수정
    @Operation(summary = "FAQ 수정", description = "FAQ를 수정합니다.")
    @PutMapping("/faq/{fno}")
    public ResponseEntity<Void> update(
            @PathVariable long fno,
            @RequestBody FaqDto faqDto
    ) {
        faqDto.setFno(fno); // fno를 DTO에 설정
        faqService.updateFromDto(faqDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "FAQ 삭제", description = "FAQ 번호로 삭제합니다.")
    @DeleteMapping("/faq/{fno}")
    public ResponseEntity<Void> delete(@PathVariable long fno) {
        faqService.deleteById(fno);
        return ResponseEntity.ok().build();
    }
}
