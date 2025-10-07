package com.simplecoding.simpledmsreactlogin.eventnotice.controller;


import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.eventnotice.dto.EventNoticeDto;
import com.simplecoding.simpledmsreactlogin.eventnotice.service.EventNoticeService;
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
@Tag(name = "EventNoticeController", description = "EVENTNOTICE REST API")
@RequestMapping("/api") // 공통 URL /api 적용
public class EventNoticeController {
    private final EventNoticeService eventNoticeService;
    private final CommonUtil commonUtil;

    // 전체 조회 + 페이징
    @Operation(summary = "EVENTNOTICE 전체 조회", description = "검색 키워드로 EVENTNOTICE 목록을 조회합니다.")
    @GetMapping("/event-notice")
    public ResponseEntity<ApiResponse<List<EventNoticeDto>>> selectNoticeList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable
    ) {
        Page<EventNoticeDto> pages = eventNoticeService.selectEventNoticeList(searchKeyword, pageable);
        ApiResponse<List<EventNoticeDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 단일 NOTICE 조회
    @Operation(summary = "EVENTNOTICE 상세 조회", description = "EVENTNOTICE 번호로 상세 정보를 조회합니다.")
    @GetMapping("/event-notice/{eid}")
    public ResponseEntity<ApiResponse<EventNoticeDto>> findById(
            @Parameter(description = "조회할 EVENTNOTICE 번호") @PathVariable long eid
    ) {
        EventNoticeDto eventNoticeDto = eventNoticeService.findById(eid);
        ApiResponse<EventNoticeDto> response = new ApiResponse<>(true, "조회 성공", eventNoticeDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 추가
    @Operation(summary = "EVENTNOTICE 등록", description = "새로운 EVENTNOTICE 등록합니다.")
    @PostMapping("/event-notice")
    public ResponseEntity<Void> create(@Valid @RequestBody EventNoticeDto eventNoticeDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        eventNoticeService.save(eventNoticeDto);
        return ResponseEntity.ok().build();
    }

    // 수정
    @Operation(summary = "EVENTNOTICE 수정", description = "EVENTNOTICE 수정합니다.")
    @PutMapping("/event-notice/{eid}")
    public ResponseEntity<Void> update(
            @PathVariable long eid,
            @RequestBody EventNoticeDto eventNoticeDto
    ) {
        eventNoticeDto.setEid(eid); // eid를 DTO에 설정
        eventNoticeService.updateFromDto(eventNoticeDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "EVENTNOTICE 삭제", description = "EVENTNOTICE 번호로 삭제합니다.")
    @DeleteMapping("/event-notice/{eid}")
    public ResponseEntity<Void> delete(@PathVariable long eid) {
        eventNoticeService.deleteById(eid);
        return ResponseEntity.ok().build();
    }
}
