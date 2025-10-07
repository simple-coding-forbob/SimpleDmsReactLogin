package com.simplecoding.simpledmsreactlogin.approval.controller;

import com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto;
import com.simplecoding.simpledmsreactlogin.approval.service.ApprovalService;
import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
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
@Tag(name = "ApprovalController", description = "결재 라인 API 문서")
@RequestMapping("/api")
public class ApprovalController {

    private final ApprovalService approvalService;
    private final CommonUtil commonUtil;

    // 내가 올린 문서 조회
    @Operation(summary = "내가 올린 문서 조회", description = "검색 키워드로 내가 올린 문서를 조회합니다.")
    @GetMapping("/approval-drafts")
    public ResponseEntity<ApiResponse<List<ApprovalDto>>> selectApprovalDrafts(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 10) Pageable pageable) {

        Page<ApprovalDto> pages = approvalService.selectApprovalDrafts(searchKeyword, pageable);

        ApiResponse<List<ApprovalDto>> response = new ApiResponse<>(true,
                "조회 성공", pages.getContent(), pages.getNumber(), pages.getTotalElements());
        return ResponseEntity.ok(response);
    }

    // 내가 결재해야할 문서 조회
    @Operation(summary = "내가 결재해야할 문서 조회", description = "검색 키워드로 결재해야할 문서를 조회합니다.")
    @GetMapping("/approval-pending")
    public ResponseEntity<ApiResponse<List<ApprovalDto>>> selectApprovalPending(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 10) Pageable pageable) {

        Page<ApprovalDto> pages = approvalService.selectApprovalPending(searchKeyword, pageable);

        ApiResponse<List<ApprovalDto>> response = new ApiResponse<>(true,
                "조회 성공", pages.getContent(), pages.getNumber(), pages.getTotalElements());
        return ResponseEntity.ok(response);
    }
    
    // 내가 이미 결재한 문서 조회
    @Operation(summary = "내가 이미 결재한 문서 조회", description = "검색 키워드로 결재해야할 문서를 조회합니다.")
    @GetMapping("/approval-completed")
    public ResponseEntity<ApiResponse<List<ApprovalDto>>> selectApprovalCompleted(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 10) Pageable pageable) {

        Page<ApprovalDto> pages = approvalService.selectApprovalCompleted(searchKeyword, pageable);

        ApiResponse<List<ApprovalDto>> response = new ApiResponse<>(true,
                "조회 성공", pages.getContent(), pages.getNumber(), pages.getTotalElements());
        return ResponseEntity.ok(response);
    }

    // 저장
    @Operation(summary = "결재 라인 저장", description = "새로운 결재 라인을 등록합니다.")
    @PostMapping("/approval")
    public ResponseEntity<Void> create(@Valid @RequestBody ApprovalDto approvalDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        approvalService.save(approvalDto);
        return ResponseEntity.ok().build();
    }

    // 승인
    @Operation(summary = "승인", description = "승인 상태로 수정합니다.")
    @PutMapping("/approval/{aid}")
    public ResponseEntity<Void> approve(
            @Parameter(description = "수정할 결재 ID") @PathVariable Long aid,
            @RequestBody ApprovalDto approvalDto) {

        approvalDto.setAid(aid);
        approvalService.approve(approvalDto);
        return ResponseEntity.ok().build();
    }
    
    // 반려
    @Operation(summary = "반려", description = "반려 상태로 수정합니다.")
    @PutMapping("/reject/{aid}")
    public ResponseEntity<Void> reject(
            @Parameter(description = "수정할 결재 ID") @PathVariable Long aid,
            @RequestBody ApprovalDto approvalDto) {

        approvalDto.setAid(aid);
        approvalService.reject(approvalDto);
        return ResponseEntity.ok().build();
    }

    // 상세조회
    @Operation(summary = "결재 라인 상세 조회", description = "결재 라인 ID로 상세 정보를 조회합니다.")
    @GetMapping("/approval/{aid}")
    public ResponseEntity<ApiResponse<ApprovalDto>> findById(
            @Parameter(description = "조회할 결재 라인 ID") @PathVariable Long aid) {

        ApprovalDto approvalDto = approvalService.findById(aid);
        ApiResponse<ApprovalDto> response = new ApiResponse<>(true, "조회 성공", approvalDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 삭제
    @Operation(summary = "결재 라인 삭제", description = "결재 라인 ID로 삭제합니다.")
    @DeleteMapping("/approval/{aid}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "삭제할 결재 라인 ID") @PathVariable Long aid) {

        approvalService.deleteById(aid);
        return ResponseEntity.ok().build();
    }
}
