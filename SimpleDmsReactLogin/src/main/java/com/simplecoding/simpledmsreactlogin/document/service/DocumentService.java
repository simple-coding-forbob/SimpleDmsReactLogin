package com.simplecoding.simpledmsreactlogin.document.service;

import com.simplecoding.simpledmsreactlogin.approval.repository.ApprovalRepository;
import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.common.dto.PdfDto;
import com.simplecoding.simpledmsreactlogin.document.dto.DocumentDto;
import com.simplecoding.simpledmsreactlogin.document.entity.Document;
import com.simplecoding.simpledmsreactlogin.document.repository.DocumentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final ApprovalRepository approvalRepository;
    private final DocumentRepository documentRepository;
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 전체조회 + 검색 + 페이징
    public Page<DocumentDto> selectDocumentList(String searchKeyword, Pageable pageable) {
        return documentRepository.selectDocumentList(searchKeyword, pageable);
    }

    // 저장
    @Transactional
    public void save(DocumentDto documentDto) {
        SecurityUserDto securityUserDto= commonUtil.getLoginUser();
        documentDto.setDrafter(securityUserDto.getEno());
        Document document = mapStruct.toEntity(documentDto);
        documentRepository.save(document);
    }

    // 상세조회
    public DocumentDto findById(Long docId) {
        Document document = documentRepository.findById(docId)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        return mapStruct.toDto(document);
    }

    // 삭제
    @Transactional
    public void deleteById(Long docId) {
//        TODO: 이미 결재가 1개라도 된것은 삭제 불가
        if(approvalRepository.countAlreadyApproval(docId)>0) {
            throw new RuntimeException(commonUtil.getMessage("errors.already.approval"));
        }
        documentRepository.deleteById(docId);
    }

    public byte[] generatePdf(Long docId) throws Exception {
        // 1. Document 조회
        Document document = documentRepository.findById(docId)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        PdfDto pdfDto=mapStruct.toPdfDto(document);

        // 3. JasperReports 템플릿 불러오기
        Path path = Paths.get(uploadDir, document.getTemplate().getFileName());
        return commonUtil.generatePdf(path.toString(), pdfDto);
    }
}
