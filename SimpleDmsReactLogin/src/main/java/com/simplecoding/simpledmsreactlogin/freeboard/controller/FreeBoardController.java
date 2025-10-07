package com.simplecoding.simpledmsreactlogin.freeboard.controller;


import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.freeboard.dto.FreeBoardDto;
import com.simplecoding.simpledmsreactlogin.freeboard.service.FreeBoardService;
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
@Tag(name = "FreeBoardController", description = "FREEBOARD REST API")
@RequestMapping("/api") // 공통 URL /api 적용
public class FreeBoardController {
    private final FreeBoardService freeBoardService;
    private final CommonUtil commonUtil;

    // 전체 조회 + 페이징
    @Operation(summary = "FREEBOARD 전체 조회", description = "검색 키워드로 FREEBOARD 목록을 조회합니다.")
    @GetMapping("/free-board")
    public ResponseEntity<ApiResponse<List<FreeBoardDto>>> selectNoticeList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable
    ) {
        Page<FreeBoardDto> pages = freeBoardService.selectFreeBoardList(searchKeyword, pageable);
        ApiResponse<List<FreeBoardDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 단일 FREEBOARD 조회
    @Operation(summary = "FREEBOARD 상세 조회", description = "FREEBOARD 번호로 상세 정보를 조회합니다.")
    @GetMapping("/free-board/{fid}")
    public ResponseEntity<ApiResponse<FreeBoardDto>> findById(
            @Parameter(description = "조회할 FREEBOARD 번호") @PathVariable long fid
    ) {
        FreeBoardDto freeBoardDto = freeBoardService.findById(fid);
        ApiResponse<FreeBoardDto> response = new ApiResponse<>(true, "조회 성공", freeBoardDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 추가
    @Operation(summary = "FREEBOARD 등록", description = "새로운 FREEBOARD를 등록합니다.")
    @PostMapping("/free-board")
    public ResponseEntity<Void> create(@Valid @RequestBody FreeBoardDto freeBoardDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        freeBoardService.save(freeBoardDto);
        return ResponseEntity.ok().build();
    }

    // 수정
    @Operation(summary = "FREEBOARD 수정", description = "FREEBOARD를 수정합니다.")
    @PutMapping("/free-board/{fid}")
    public ResponseEntity<Void> update(
            @PathVariable long fid,
            @RequestBody FreeBoardDto freeBoardDto
    ) {
        freeBoardDto.setFid(fid); // fid를 DTO에 설정
        freeBoardService.updateFromDto(freeBoardDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "FREEBOARD 삭제", description = "FREEBOARD 번호로 삭제합니다.")
    @DeleteMapping("/free-board/{fid}")
    public ResponseEntity<Void> delete(@PathVariable long fid) {
        freeBoardService.deleteById(fid);
        return ResponseEntity.ok().build();
    }
}
