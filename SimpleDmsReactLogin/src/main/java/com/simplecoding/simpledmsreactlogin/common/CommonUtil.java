package com.simplecoding.simpledmsreactlogin.common;

import com.simplecoding.simpledmsreactlogin.common.ErrorMsg;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.*;
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

    /**
     * 서버에 파일 저장
     */
    public void saveFile(MultipartFile file, String  uuid) throws IOException {
        if (file == null || file.isEmpty()) {  // 파일 없으면 만들지 않기
            return;
        }

        Path folderPath = Paths.get(uploadDir); // uploadDir
        if (!Files.exists(folderPath)) {
            throw new RuntimeException(getMessage("errors.path.not.found"));
        }
        // 파일 저장
        Path uuidPath = folderPath.resolve(uuid);   // uploadDir/uuid
        file.transferTo(uuidPath);
    }

    /**
     * 서버에 저장된 파일 삭제
     */
    public void deleteFile(String uuid) {
        Path uuidPath = Paths.get(uploadDir).resolve(uuid);
        try {
            Files.deleteIfExists(uuidPath);          // 있을때만 삭제
        } catch (IOException e) {
            throw new RuntimeException(getMessage("errors.file.delete.fail"), e);
        }
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
}
