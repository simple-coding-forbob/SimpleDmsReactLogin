package com.simplecoding.simpledmsreactlogin.common;

import com.simplecoding.simpledmsreactlogin.common.dto.PdfDto;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PdfGen {

    private final ErrorMsg errorMsg;

    public byte[] generatePdf(String templatePath, PdfDto pdfDto) throws Exception {
        Path path = Paths.get(templatePath);                                                                // 1. JasperReports 템플릿 로딩 (.jasper)
        if (!Files.exists(path)) {
            throw new RuntimeException(errorMsg.getMessage("errors.path.not.found"));
        }

//        TODO: try - with - resources 로 에러나더라도 무조건 자동 close() 함수 실행됨
        try(InputStream inputStream = new FileInputStream(path.toFile())) {
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(List.of(pdfDto));           // 2. 단일 객체라도 Collection으로 감싸기
            JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, new HashMap<>(), dataSource);  // 3. PDF 생성
            return JasperExportManager.exportReportToPdf(jasperPrint);
        }
    }
}
