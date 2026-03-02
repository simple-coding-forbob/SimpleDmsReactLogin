package com.simplecoding.simpledmsreactlogin.template.service;

import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.common.dto.PdfDto;
import com.simplecoding.simpledmsreactlogin.document.repository.DocumentRepository;
import com.simplecoding.simpledmsreactlogin.template.dto.TemplateDto;
import com.simplecoding.simpledmsreactlogin.template.entity.Template;
import com.simplecoding.simpledmsreactlogin.template.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final DocumentRepository documentRepository;
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Page<TemplateDto> selectTemplateList(String searchKeyword, Pageable pageable) {
        return templateRepository.selectTemplateList(searchKeyword, pageable);
    }

    public List<TemplateDto> selectAll() {
        return templateRepository.selectAll();
    }

    public void save(TemplateDto templateDto) throws Exception {
        String fileName = templateDto.getFileData().getOriginalFilename();         // 업로드 파일명
        if(templateRepository.countByFileName(fileName) > 0) {
            throw new RuntimeException(commonUtil.getMessage("errors.save.not.able"));
        }

        saveByFile(templateDto.getFileData());                                      // 업로더 폴더에 파일 저장

        templateDto.setFileName(fileName);
        Template template = mapStruct.toEntity(templateDto);
        templateRepository.save(template);                                           // db 저장
    }

    public void saveByFile( MultipartFile file) throws Exception {
        // 1. 업로드 폴더 체크
        Path folder = Paths.get(uploadDir);
        if (!Files.exists(folder)) throw new RuntimeException(commonUtil.getMessage("errors.path.not.found"));

        // 2. 파일 저장 (같은 이름이면 덮어쓰기)
        Path path = Paths.get(uploadDir, file.getOriginalFilename());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
    }

    /* TODO: 삭제 — 단, 문서 테이블에서 사용중인 템플릿은 삭제 불가 */
    public void deleteById(long tid) {
//      TODO: 문서 테이블에서 사용중인지 확인
        if (documentRepository.countByDocumentId(tid) > 0) {
            throw new RuntimeException(commonUtil.getMessage("errors.delete.not.able"));
        }

        deleteByFile(tid);                      // 업로더 폴더에 파일 삭제
        templateRepository.deleteById(tid);     // db 삭제
    }

    public void deleteByFile(long tid) {
        Template template = templateRepository.findById(tid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        // 1. 파일 삭제
        try {
            Path path = Paths.get(uploadDir, template.getFileName());
            Files.delete(path);
        } catch (Exception e) {
            throw new RuntimeException(commonUtil.getMessage("errors.file.delete.fail"), e);
        }
    }

    public byte[] generatePdf(Long docId) throws Exception {
        // 1. Document 조회
        Template template = templateRepository.findById(docId)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        PdfDto pdfDto=new PdfDto();
        pdfDto.setTitle(template.getTitle());

        // 3. JasperReports 템플릿 불러오기
        Path path = Paths.get(uploadDir, template.getFileName());
        return commonUtil.generatePdf(path.toString(), pdfDto);
    }
}
