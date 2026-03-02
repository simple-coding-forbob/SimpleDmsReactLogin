package com.simplecoding.simpledmsreactlogin.newsboard.service;


import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;

import com.simplecoding.simpledmsreactlogin.newsboard.dto.NewsBoardDto;
import com.simplecoding.simpledmsreactlogin.newsboard.entity.NewsBoard;
import com.simplecoding.simpledmsreactlogin.newsboard.repository.NewsBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NewsBoardService {

    //    DB CRUD 클래스 받기 : JPA 제공 함수 사용 가능
    private final NewsBoardRepository newsBoardRepository; // DI
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    public Page<NewsBoardDto> selectNewsBoardList(String searchKeyword, Pageable pageable) {
        Page<NewsBoardDto> page= newsBoardRepository.selectNewsBoardList(searchKeyword, pageable);
        return page;
    }

    @Transactional
    public NewsBoardDto findById(long nid) {
//        JPA 상세조회 함수 실행
        NewsBoard NewsBoard= newsBoardRepository.selectById(nid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        newsBoardRepository.increaseViewCount(nid);
        return mapStruct.toDto(NewsBoard);
    }

    //    저장/수정 : 1) 기본키가(부서번호) 없으면 저장(insert)
//               2) 기본키가(부서번호) 있으면 수정(update)
//           => JPA 내부적으로 if문 있음 : 알아서 실행됨
    public void save(NewsBoardDto NewsBoardDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
//      TODO: 1) 시큐리티에서 email 가져오기: 화면에서 전송안함
        SecurityUserDto securityUserDto =commonUtil.getLoginUser();
        NewsBoardDto.setEmail(securityUserDto.getUsername());
//      TODO: 2) 저장하기
        NewsBoard NewsBoard= mapStruct.toEntity(NewsBoardDto);
        newsBoardRepository.save(NewsBoard);
    }

    @Transactional
    public void updateFromDto(NewsBoardDto NewsBoardDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        NewsBoard NewsBoard=newsBoardRepository.findById(NewsBoardDto.getNid())
                .orElseThrow(() -> new RuntimeException("errors.not.found"));
//      TODO: 1) 시큐리티에서 email 가져오기: 화면에서 전송안함
        SecurityUserDto securityUserDto =commonUtil.getLoginUser();
        NewsBoardDto.setEmail(securityUserDto.getUsername());

        mapStruct.updateFromDto(NewsBoardDto, NewsBoard);
    }

    //    삭제 함수
    public void deleteById(long nid) {
        newsBoardRepository.deleteById(nid);
    }
}
