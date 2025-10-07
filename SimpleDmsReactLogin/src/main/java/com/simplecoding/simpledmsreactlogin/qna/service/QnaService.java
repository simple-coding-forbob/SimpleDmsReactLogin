package com.simplecoding.simpledmsreactlogin.qna.service;


import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.qna.dto.QnaDto;
import com.simplecoding.simpledmsreactlogin.qna.entity.Qna;
import com.simplecoding.simpledmsreactlogin.qna.repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QnaService {

    //    DB CRUD 클래스 받기 : JPA 제공 함수 사용 가능
    private final QnaRepository qnaRepository; // DI
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    public Page<QnaDto> selectQnaList(String searchKeyword, Pageable pageable) {
        Page<QnaDto> page= qnaRepository.selectQnaList(searchKeyword, pageable);
        return page;
    }

    public QnaDto findById(long fno) {
//        JPA 상세조회 함수 실행
        Qna qna= qnaRepository.findById(fno)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        return mapStruct.toDto(qna);
    }

    //    저장/수정 : 1) 기본키가(부서번호) 없으면 저장(insert)
//               2) 기본키가(부서번호) 있으면 수정(update)
//           => JPA 내부적으로 if문 있음 : 알아서 실행됨
    public void save(QnaDto qnaDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        Qna qna= mapStruct.toEntity(qnaDto);
        qnaRepository.save(qna);
    }

    @Transactional
    public void updateFromDto(QnaDto qnaDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        Qna qna=qnaRepository.findById(qnaDto.getQno())
                .orElseThrow(() -> new RuntimeException("errors.not.found"));

        mapStruct.updateFromDto(qnaDto, qna);
    }

    //    삭제 함수
    public void deleteById(long qno) {
        qnaRepository.deleteById(qno);
    }
}
