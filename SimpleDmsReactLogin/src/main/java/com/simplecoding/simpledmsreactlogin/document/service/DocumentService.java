package com.simplecoding.simpledmsreactlogin.document.service;

import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import com.simplecoding.simpledmsreactlogin.common.ErrorMsg;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.common.PdfGen;
import com.simplecoding.simpledmsreactlogin.common.SecurityUtil;
import com.simplecoding.simpledmsreactlogin.document.dto.DocumentDto;
import com.simplecoding.simpledmsreactlogin.document.entity.Document;
import com.simplecoding.simpledmsreactlogin.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final MapStruct mapStruct;
    private final ErrorMsg errorMsg;
    private final SecurityUtil securityUtil;
    private final PdfGen pdfGen;

    // 전체조회 + 검색 + 페이징
    public Page<DocumentDto> selectDocumentList(String searchKeyword, Pageable pageable) {
        return documentRepository.selectDocumentList(searchKeyword, pageable);
    }

    // 저장 (신규 문서)
    public void save(DocumentDto documentDto) {
        // 로그인 유저의 사번 세팅
        SecurityUserDto securityUserDto = securityUtil.getLoginUser();
        documentDto.setDrafter(securityUserDto.getEno());

        // DTO -> Entity 변환
        Document document = mapStruct.toEntity(documentDto);
        // DB 저장
        documentRepository.save(document);
    }

    // 상세조회 (Entity)
    public Document findById(Long docId) {
        return documentRepository.findById(docId)
                .orElseThrow(() -> new RuntimeException(errorMsg.getMessage("errors.not.found")));
    }

    // 상세조회 (DTO)
    public DocumentDto findByIdToDto(Long docId) {
        Document document = findById(docId);
        return mapStruct.toDto(document);
    }

    // 삭제
    public void deleteById(Long docId) {
        documentRepository.deleteById(docId);
    }

    public byte[] generatePdf(Long id) throws Exception {
        // 1. Document 조회
        Document document = findById(id);
        // 2. 데이터 바인딩
        Map<String, Object> params = new HashMap<>();
        params.put("title", document.getTitle());
        params.put("content", document.getContent());
        params.put("drafter", document.getEmp().getEname());

        // 3. JasperReports 템플릿 불러오기 (resources 폴더 안에 .jrxml 또는 .jasper)
        return pdfGen.generatePdf("jasper/document.jasper", document, params);
    }
}
