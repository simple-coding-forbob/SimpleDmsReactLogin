package com.simplecoding.simpledmsreactlogin.document.service;

import com.simplecoding.simpledmsreactlogin.common.ErrorMsg;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.document.dto.DocumentDto;
import com.simplecoding.simpledmsreactlogin.document.entity.Document;
import com.simplecoding.simpledmsreactlogin.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final MapStruct mapStruct;
    private final ErrorMsg errorMsg;

    // 전체조회 + 검색 + 페이징
    public Page<DocumentDto> selectDocumentList(String searchKeyword, Pageable pageable) {
        return documentRepository.selectDocumentList(searchKeyword, pageable);
    }

    // 저장 (신규 문서)
    public void save(DocumentDto documentDto) {
        // DTO -> Entity 변환
        Document document = mapStruct.toEntity(documentDto);

        // UUID 생성
        String newUuid = UUID.randomUUID().toString();
        document.setUuid(newUuid);

        // 다운로드 URL 생성
        String downloadURL = generateDownloadUrl(newUuid);
        document.setFileUrl(downloadURL);

        // DB 저장
        documentRepository.save(document);
    }

    // 다운로드 URL 생성
    public String generateDownloadUrl(String uuid) {
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()              // http://localhost:8080
                .path("/api/download/document/{uuid}") // 경로 지정
                .buildAndExpand(uuid)                  // {uuid} 치환
                .toUriString();                        // 최종 URL 생성
    }

    // 상세조회
    public Document findById(String uuid) {
        return documentRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException(errorMsg.getMessage("errors.not.found")));
    }

    // 삭제
    public void deleteById(String uuid) {
        documentRepository.deleteById(uuid);
    }

}
