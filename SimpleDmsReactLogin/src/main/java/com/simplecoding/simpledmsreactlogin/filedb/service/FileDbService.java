package com.simplecoding.simpledmsreactlogin.filedb.service;


import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.filedb.dto.FileDbDto;
import com.simplecoding.simpledmsreactlogin.filedb.entity.FileDb;
import com.simplecoding.simpledmsreactlogin.filedb.repository.FileDbRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Log4j2
@Service
@RequiredArgsConstructor
public class FileDbService {

    private final FileDbRepository fileDbRepository; // JPA DB 객체
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    //    like 검색 + 전체조회 + 페이징처리
    public Page<FileDbDto> selectFileDbList(String searchKeyword, Pageable pageable) {
        Page<FileDbDto> page= fileDbRepository.selectFileDbList(searchKeyword, pageable);
        return page;
    }

    //    TODO: 저장: save
    public void save(FileDbDto fileDbDto) throws Exception {
        FileDb fileDb=mapStruct.toEntity(fileDbDto);

        String uuid=UUID.randomUUID().toString();                           // 1) UUID 만들기(기본키): 자바에서 중복안되게 만들어주는 글자(랜덤)
        fileDb.setUuid(uuid);

        if(fileDbDto.getFileData()!=null) {
            String downloadURL=commonUtil.generateUrl("fileDb", uuid);  // 2) 업로드 파일이 있을때만 다운로드 URL 만들기
            fileDb.setFileUrl(downloadURL);
            commonUtil.saveFile(fileDbDto.getFileData(), uuid);              // 3) 업로드 파일이 있을때만 파일 만들기
        }

        fileDbRepository.save(fileDb);                                        // 4) DB insert(fileDbVO)
    }

    //    상세조회
    public FileDb findById(String uuid) {
        return fileDbRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
    }

    //    삭제 함수
    public void deleteById(String uuid) {
        commonUtil.deleteFile(uuid);                       // 1) 업로드 폴더에 파일 삭제하기
        fileDbRepository.deleteById(uuid);
    }
}

