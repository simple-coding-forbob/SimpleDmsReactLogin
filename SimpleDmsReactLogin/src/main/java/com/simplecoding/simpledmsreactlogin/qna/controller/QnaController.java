package com.simplecoding.simpledmsreactlogin.qna.controller;


import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.qna.dto.QnaDto;
import com.simplecoding.simpledmsreactlogin.qna.service.QnaService;
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

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@Tag(name = "QnaController", description = "QNA REST API")
@RequestMapping("/api") // 공통 URL /api 적용
public class QnaController {

    private final QnaService qnaService;
    private final CommonUtil commonUtil;

    // 전체 조회 + 페이징
    @Operation(summary = "QNA 전체 조회", description = "검색 키워드로 QNA 목록을 조회합니다.")
    @GetMapping("/qna")
    public ResponseEntity<ApiResponse<List<QnaDto>>> selectQnaList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable
    ) {
        Page<QnaDto> pages = qnaService.selectQnaList(searchKeyword, pageable);
        ApiResponse<List<QnaDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 단일 QNA 조회
    @Operation(summary = "QNA 상세 조회", description = "QNA 번호로 상세 정보를 조회합니다.")
    @GetMapping("/qna/{qno}")
    public ResponseEntity<ApiResponse<QnaDto>> findById(
            @Parameter(description = "조회할 QNA 번호") @PathVariable long qno
    ) {
        QnaDto qnaDto = qnaService.findById(qno);
        ApiResponse<QnaDto> response = new ApiResponse<>(true, "조회 성공", qnaDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 추가
    @Operation(summary = "QNA 등록", description = "새로운 QNA를 등록합니다.")
    @PostMapping("/qna")
    public ResponseEntity<Void> create(@Valid @RequestBody QnaDto qnaDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        qnaService.save(qnaDto);
        return ResponseEntity.ok().build();
    }

    // 수정
    @Operation(summary = "QNA 수정", description = "QNA를 수정합니다.")
    @PutMapping("/qna/{qno}")
    public ResponseEntity<Void> update(
            @PathVariable long qno,
            @RequestBody QnaDto qnaDto
    ) {
        qnaDto.setQno(qno); // qno를 DTO에 설정
        qnaService.updateFromDto(qnaDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "QNA 삭제", description = "QNA 번호로 삭제합니다.")
    @DeleteMapping("/qna/{qno}")
    public ResponseEntity<Void> delete(@PathVariable long qno) {
        qnaService.deleteById(qno);
        return ResponseEntity.ok().build();
    }
}
