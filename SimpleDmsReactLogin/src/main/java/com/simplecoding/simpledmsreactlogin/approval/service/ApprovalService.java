package com.simplecoding.simpledmsreactlogin.approval.service;

import com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto;
import com.simplecoding.simpledmsreactlogin.approval.entity.Approval;
import com.simplecoding.simpledmsreactlogin.approval.repository.ApprovalRepository;
import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ApprovalService {

    private final ApprovalRepository approvalRepository;
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    // 내가 올린 문서 조회
    public Page<ApprovalDto> selectApprovalDrafts(String searchKeyword, Pageable pageable) {
        SecurityUserDto securityUserDto= commonUtil.getLoginUser();
        return approvalRepository.selectApprovalDrafts(searchKeyword, securityUserDto.getEno(), pageable);
    }

    // 내가 결재해야할 문서 조회
    public Page<ApprovalDto> selectApprovalPending(String searchKeyword, Pageable pageable) {
        SecurityUserDto securityUserDto= commonUtil.getLoginUser();
        return approvalRepository.selectApprovalPending(searchKeyword, securityUserDto.getEno(), pageable);
    }

    // 내가 이미 결재한 문서 조회
    public Page<ApprovalDto> selectApprovalCompleted(String searchKeyword, Pageable pageable) {
        SecurityUserDto securityUserDto= commonUtil.getLoginUser();
        return approvalRepository.selectApprovalCompleted(searchKeyword, securityUserDto.getEno(), pageable);
    }

    // 저장 (신규 결재 라인)
    public void save(ApprovalDto approvalDto) {
        Approval approval = mapStruct.toEntity(approvalDto);
        approvalRepository.save(approval);
    }

    // 상세조회
    public ApprovalDto findById(Long aid) {
        Approval approval = approvalRepository.findById(aid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        return mapStruct.toDto(approval);
    }

    // 승인
    @Transactional
    public void approve(ApprovalDto approvalDto) {
        Approval approval = approvalRepository.findById(approvalDto.getAid())
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        mapStruct.updateFromDto(approvalDto, approval);
        // 승인 시간 기록
        approval.setApproveTime(LocalDateTime.now());
    }

    // 반려
    @Transactional
    public void reject(ApprovalDto approvalDto) {
        Approval approval = approvalRepository.findById(approvalDto.getAid())
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        mapStruct.updateFromDto(approvalDto, approval);
        // 승인/반려 시간 기록
        approval.setApproveTime(LocalDateTime.now());
    }

    // 삭제
    public void deleteById(Long aid) {
        approvalRepository.deleteById(aid);
    }
}
