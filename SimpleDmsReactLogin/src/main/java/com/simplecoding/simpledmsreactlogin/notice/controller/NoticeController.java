package com.simplecoding.simpledmsreactlogin.notice.controller;


import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.notice.dto.NoticeDto;
import com.simplecoding.simpledmsreactlogin.notice.service.NoticeService;
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
@Tag(name = "NoticeController", description = "NOTICE REST API")
@RequestMapping("/api") // 공통 URL /api 적용
public class NoticeController {
    private final NoticeService noticeService;
    private final CommonUtil commonUtil;

    // 전체 조회 + 페이징
    @Operation(summary = "NOTICE 전체 조회", description = "검색 키워드로 NOTICE 목록을 조회합니다.")
    @GetMapping("/notice")
    public ResponseEntity<ApiResponse<List<NoticeDto>>> selectNoticeList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable
    ) {
        Page<NoticeDto> pages = noticeService.selectNoticeList(searchKeyword, pageable);
        ApiResponse<List<NoticeDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 단일 NOTICE 조회
    @Operation(summary = "NOTICE 상세 조회", description = "NOTICE 번호로 상세 정보를 조회합니다.")
    @GetMapping("/notice/{nid}")
    public ResponseEntity<ApiResponse<NoticeDto>> findById(
            @Parameter(description = "조회할 NOTICE 번호") @PathVariable long nid
    ) {
        NoticeDto noticeDto = noticeService.findById(nid);
        ApiResponse<NoticeDto> response = new ApiResponse<>(true, "조회 성공", noticeDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 추가
    @Operation(summary = "NOTICE 등록", description = "새로운 NOTICE를 등록합니다.")
    @PostMapping("/notice")
    public ResponseEntity<Void> create(@Valid @RequestBody NoticeDto noticeDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        noticeService.save(noticeDto);
        return ResponseEntity.ok().build();
    }

    // 수정
    @Operation(summary = "NOTICE 수정", description = "NOTICE를 수정합니다.")
    @PutMapping("/notice/{nid}")
    public ResponseEntity<Void> update(
            @PathVariable long nid,
            @Valid  @RequestBody NoticeDto noticeDto, BindingResult result
    ) {
        commonUtil.checkBindingResult(result);
        noticeDto.setNid(nid); // nid를 DTO에 설정
        noticeService.updateFromDto(noticeDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "NOTICE 삭제", description = "NOTICE 번호로 삭제합니다.")
    @DeleteMapping("/notice/{nid}")
    public ResponseEntity<Void> delete(@PathVariable long nid) {
        noticeService.deleteById(nid);
        return ResponseEntity.ok().build();
    }
}
