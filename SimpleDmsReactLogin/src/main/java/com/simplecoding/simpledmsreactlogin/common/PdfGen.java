package com.simplecoding.simpledmsreactlogin.common;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Component
public class PdfGen {

    /**
     * 단일 데이터 객체로 PDF 생성
     * @param templatePath resources/jasper/... .jasper 파일 경로
     * @param data 단일 데이터 객체
     * @param parameters JasperReports 파라미터
     * @return PDF 바이트 배열
     * @throws JRException, IOException
     */
    public <T> byte[] generatePdf(String templatePath, T data, Map<String, Object> parameters) throws Exception {
        // 1. JasperReports 템플릿 로딩 (.jasper)
        InputStream reportStream = new ClassPathResource(templatePath).getInputStream();

        // 2. 단일 객체라도 Collection으로 감싸기
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(List.of(data));

        // 3. PDF 생성
        JasperPrint jasperPrint = JasperFillManager.fillReport(reportStream, parameters, dataSource);
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}
