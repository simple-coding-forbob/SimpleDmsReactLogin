package com.simplecoding.simpledmsreactlogin.common;

import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import com.simplecoding.simpledmsreactlogin.common.dto.PdfDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

@Component
@Log4j2
@RequiredArgsConstructor
public class CommonUtil {

    @Value("${image.upload-dir}")
    private String uploadDir;
    private final MessageSource messageSource;

//    에러메세지 표시
    public String getMessage(String code) {
        return messageSource.getMessage(code, null, Locale.getDefault());
    }

//    서버 유효성 체크
    public void checkBindingResult(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 로그로 상세 에러
            bindingResult.getAllErrors()
                    .forEach(error -> log.error(error.getDefaultMessage()));

            // 통합 메시지
            throw new RuntimeException(getMessage("errors.validation.common"));
        }
    }

    // 서버에 파일 저장
    public void saveFile(MultipartFile file, String  uuid) throws Exception {
        Path folderPath = Paths.get(uploadDir); // uploadDir
        if (!Files.exists(folderPath)) {
            throw new RuntimeException(getMessage("errors.path.not.found"));
        }
        // 파일 저장
        Path uuidPath = folderPath.resolve(uuid);   // uploadDir/uuid
        file.transferTo(uuidPath);
    }

    // 서버에 저장된 파일 삭제
    public void deleteFile(String uuid) {
        Path uuidPath = Paths.get(uploadDir).resolve(uuid);
        try {
            Files.deleteIfExists(uuidPath);          // 있을때만 삭제
        } catch (IOException e) {
            throw new RuntimeException(getMessage("errors.file.delete.fail"), e);
        }
    }

    // 서버에 저장된 파일 읽기
    public byte[] readFile(String uuid) throws Exception {
        // 서버에 저장된 실제 파일 경로
        Path path = Paths.get(uploadDir).resolve(uuid);

        if (!Files.exists(path)) {
            throw new RuntimeException(getMessage("errors.path.not.found")); // 또는 커스텀 예외
        }

        return Files.readAllBytes(path);
    }

    //	다운로드 URL을 만들어주는 메소드
    // 예시) http://localhost:8080/api/download/fileDb/{uuid}
    public String generateUrl(String path, String uuid) {
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()               // 기본주소 : http://localhost:8080
                .path("/api/download/"+path+"/{uuid}")  // 경로    : /download/fileDb/{uuid}
                .buildAndExpand(uuid)                   // 파라메터방식: uuid 값넣기
                .toUriString();                         // 위에꺼조합:

    }

//    서버에서 로그인 유저 꺼내기(만약 로그인 했다면)
    public SecurityUserDto getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증 객체가 없거나 인증 안 된 경우
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException(getMessage("errors.unauthorized"));
        }

        Object principal = authentication.getPrincipal();

        // principal 이 SecurityUserDto 인 경우만 반환
        if (principal instanceof SecurityUserDto user) {
            return user;
        } else {
            throw new RuntimeException(getMessage("errors.unauthorized"));
        }
    }

//    pdf 만들기
    public byte[] generatePdf(String templatePath, PdfDto pdfDto) throws Exception {
        Path path = Paths.get(templatePath);                                                                // 1. JasperReports 템플릿 로딩 (.jasper)
        if (!Files.exists(path)) {
            throw new RuntimeException(getMessage("errors.path.not.found"));
        }

//        TODO: try - with - resources 로 에러나더라도 무조건 자동 close() 함수 실행됨
        try(InputStream inputStream = new FileInputStream(path.toFile())) {
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(List.of(pdfDto));           // 2. 단일 객체라도 Collection으로 감싸기
            JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, new HashMap<>(), dataSource);  // 3. PDF 생성
            return JasperExportManager.exportReportToPdf(jasperPrint);
        }
    }
}
