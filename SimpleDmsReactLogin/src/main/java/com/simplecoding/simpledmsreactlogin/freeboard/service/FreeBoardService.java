package com.simplecoding.simpledmsreactlogin.freeboard.service;


import com.simplecoding.simpledmsreactlogin.common.ErrorMsg;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.freeboard.dto.FreeBoardDto;
import com.simplecoding.simpledmsreactlogin.freeboard.entity.FreeBoard;
import com.simplecoding.simpledmsreactlogin.freeboard.repository.FreeBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FreeBoardService {

    //    DB CRUD 클래스 받기 : JPA 제공 함수 사용 가능
    private final FreeBoardRepository freeBoardRepository; // DI
    private final MapStruct mapStruct;
    private final ErrorMsg errorMsg;

    public Page<FreeBoardDto> selectFreeBoardList(String searchKeyword, Pageable pageable) {
        Page<FreeBoard> page= freeBoardRepository.selectFreeBoardList(searchKeyword, pageable);
        return page.map(freeBoard -> mapStruct.toDto(freeBoard));
    }

    public FreeBoardDto findById(long fid) {
//        JPA 상세조회 함수 실행
        FreeBoard freeBoard= freeBoardRepository.findById(fid)
                .orElseThrow(() -> new RuntimeException(errorMsg.getMessage("errors.not.found")));
        return mapStruct.toDto(freeBoard);
    }

    //    저장/수정 : 1) 기본키가(부서번호) 없으면 저장(insert)
//               2) 기본키가(부서번호) 있으면 수정(update)
//           => JPA 내부적으로 if문 있음 : 알아서 실행됨
    public void save(FreeBoardDto freeBoardDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        FreeBoard freeBoard= mapStruct.toEntity(freeBoardDto);
        freeBoardRepository.save(freeBoard);
    }

    @Transactional
    public void updateFromDto(FreeBoardDto freeBoardDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        FreeBoard freeBoard=freeBoardRepository.findById(freeBoardDto.getFid())
                .orElseThrow(() -> new RuntimeException("errors.not.found"));

        mapStruct.updateFromDto(freeBoardDto, freeBoard);
    }

    //    삭제 함수
    public void deleteById(long fid) {
        freeBoardRepository.deleteById(fid);
    }
}
