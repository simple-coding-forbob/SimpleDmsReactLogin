package com.simplecoding.simpledmsreactlogin.notice.service;


import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.notice.dto.NoticeDto;
import com.simplecoding.simpledmsreactlogin.notice.entity.Notice;
import com.simplecoding.simpledmsreactlogin.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final CommonUtil commonUtil;
    private final MapStruct mapStruct;
    
    public Page<NoticeDto> selectNoticeList(String searchKeyword, Pageable pageable) {
        return noticeRepository.selectNoticeList(searchKeyword, pageable);
    }

    public NoticeDto findById(long nid) {
//        JPA 상세조회 함수 실행
        Notice notice= noticeRepository.findById(nid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        return mapStruct.toDto(notice);
    }

    //    저장/수정 : 1) 기본키가(부서번호) 없으면 저장(insert)
//               2) 기본키가(부서번호) 있으면 수정(update)
//           => JPA 내부적으로 if문 있음 : 알아서 실행됨
    public void save(NoticeDto noticeDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        Notice notice= mapStruct.toEntity(noticeDto);
        noticeRepository.save(notice);
    }

    @Transactional
    public void updateFromDto(NoticeDto noticeDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        Notice notice=noticeRepository.findById(noticeDto.getNid())
                .orElseThrow(() -> new RuntimeException("errors.not.found"));

        mapStruct.updateFromDto(noticeDto, notice);
    }

    //    삭제 함수
    public void deleteById(long nid) {
        noticeRepository.deleteById(nid);
    }
}
