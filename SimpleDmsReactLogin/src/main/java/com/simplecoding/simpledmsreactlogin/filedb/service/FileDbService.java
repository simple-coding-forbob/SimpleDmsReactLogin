package com.simplecoding.simpledmsreactlogin.filedb.service;


import com.simplecoding.simpledmsreactlogin.common.ErrorMsg;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.filedb.dto.FileDbDto;
import com.simplecoding.simpledmsreactlogin.filedb.entity.FileDb;
import com.simplecoding.simpledmsreactlogin.filedb.repository.FileDbRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.UUID;

@Log4j2
@Service
@RequiredArgsConstructor
public class FileDbService {

    private final FileDbRepository fileDbRepository; // JPA DB 객체
    private final MapStruct mapStruct;
    private final ErrorMsg errorMsg;

    //    like 검색 + 전체조회 + 페이징처리
    public Page<FileDbDto> selectFileDbList(String searchKeyword, Pageable pageable) {
        Page<FileDb> page= fileDbRepository.selectFileDbList(searchKeyword, pageable);
        return page.map(fileDb -> mapStruct.toDto(fileDb));
    }

    //    TODO: 저장: save
    public void save(FileDbDto fileDbDto, byte[] fileData) {
//        TODO: 0) DTO 값 -> Entity 로 저장
        FileDb fileDb=mapStruct.toEntity(fileDbDto);
        // TODO 1) UUID 만들기(기본키): 자바에서 중복안되게 만들어주는 글자(랜덤)
        String newUuid=UUID.randomUUID().toString();
//		        2) 다운로드URL 만들기(개발자 알아서)
        String downloadURL=generateDownloadUrl(newUuid);
//		        3) FileDbVO 에 위의 UUID, URL 저장(setter)
        fileDb.setUuid(newUuid);
        fileDb.setFileUrl(downloadURL);
        fileDb.setFileData(fileData);
//		        4) DB insert(fileDbVO)
        fileDbRepository.save(fileDb);
    }

    //	다운로드 URL을 만들어주는 메소드
//	URL: 웹브라우저주소창 또는 img 태그 -> 해당하는 컨트롤러 메소드가 이미지를 전송해 줌
    public String generateDownloadUrl(String uuid) {
//		인터넷주소 체계        : http://localhost:8080/경로(path)?쿼리스트링
//		기본주소(ContextPath): http://localhost:8080
//		URL 만드는 클래스      : ServletUriComponentsBuilder
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()             // 기본주소 : http://localhost:8080
                .path("/api/fileDb/download/{uuid}")  // 경로    : /fileDb/download/
                .buildAndExpand(uuid)                 // 파라메터방식: uuid
                .toUriString();                       // 위에꺼조합:
        // http://localhost:8080/fileDb/download?uuid=uuid값
    }

    //    상세조회
    public FileDb findById(String uuid) {
        return fileDbRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException(errorMsg.getMessage("errors.not.found")));
    }

    //    삭제 함수
    public void deleteById(String uuid) {
        fileDbRepository.deleteById(uuid);
    }
}

