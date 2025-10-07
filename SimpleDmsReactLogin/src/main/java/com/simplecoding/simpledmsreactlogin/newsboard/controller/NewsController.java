package com.simplecoding.simpledmsreactlogin.newsboard.controller;

import com.simplecoding.simpledmsreactlogin.common.ApiResponse;

import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.newsboard.dto.NewsBoardDto;
import com.simplecoding.simpledmsreactlogin.newsboard.service.NewsBoardService;
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
@Tag(name = "NewsBoardController", description = "NEWSBOARD REST API")
@RequestMapping("/api") // 공통 URL /api 적용
public class NewsController {
    private final NewsBoardService newsBoardService;
    private final CommonUtil commonUtil;

    // 전체 조회 + 페이징
    @Operation(summary = "NEWSBOARD 전체 조회", description = "검색 키워드로 NEWSBOARD 목록을 조회합니다.")
    @GetMapping("/news-board")
    public ResponseEntity<ApiResponse<List<NewsBoardDto>>> selectNoticeList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable
    ) {
        Page<NewsBoardDto> pages = newsBoardService.selectNewsBoardList(searchKeyword, pageable);
        ApiResponse<List<NewsBoardDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 단일 NEWSBOARD 조회
    @Operation(summary = "NEWSBOARD 상세 조회", description = "NEWSBOARD 번호로 상세 정보를 조회합니다.")
    @GetMapping("/news-board/{nid}")
    public ResponseEntity<ApiResponse<NewsBoardDto>> findById(
            @Parameter(description = "조회할 NEWSBOARD 번호") @PathVariable long nid
    ) {
        NewsBoardDto newsBoardDto = newsBoardService.findById(nid);
        ApiResponse<NewsBoardDto> response = new ApiResponse<>(true, "조회 성공", newsBoardDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 추가
    @Operation(summary = "NEWSBOARD 등록", description = "새로운 FREEBOARD를 등록합니다.")
    @PostMapping("/news-board")
    public ResponseEntity<Void> create(@Valid @RequestBody NewsBoardDto newsBoardDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        newsBoardService.save(newsBoardDto);
        return ResponseEntity.ok().build();
    }

    // 수정
    @Operation(summary = "NEWSBOARD 수정", description = "FREEBOARD를 수정합니다.")
    @PutMapping("/news-board/{nid}")
    public ResponseEntity<Void> update(
            @PathVariable long nid,
            @Valid @RequestBody NewsBoardDto newsBoardDto, BindingResult result
    ) {
        commonUtil.checkBindingResult(result);
        newsBoardDto.setNid(nid); // nid를 DTO에 설정
        newsBoardService.updateFromDto(newsBoardDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "NEWSBOARD 삭제", description = "NEWSBOARD 번호로 삭제합니다.")
    @DeleteMapping("/news-board/{nid}")
    public ResponseEntity<Void> delete(@PathVariable long nid) {
        newsBoardService.deleteById(nid);
        return ResponseEntity.ok().build();
    }
}
