package com.simplecoding.simpledmsreactlogin.meetingroom.service;

import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.meetingroom.dto.MeetingRoomDto;
import com.simplecoding.simpledmsreactlogin.meetingroom.entity.MeetingRoom;
import com.simplecoding.simpledmsreactlogin.meetingroom.repository.MeetingRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MeetingRoomService {
    private final MeetingRoomRepository meetingRepository;
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

//    TODO: select 박스 태그에서 사용: 전체조회
    public List<MeetingRoomDto> findAll() {
        List<MeetingRoom> list= meetingRepository.findAll();
        return list.stream()
                .map(data -> mapStruct.toDto(data))
                .collect(Collectors.toList());
    }

    public Page<MeetingRoomDto> selectMeetingRoomList(String searchKeyword, Pageable pageable) {
        Page<MeetingRoomDto> page= meetingRepository.selectMeetingRoomList(searchKeyword, pageable);
        return page;
    }

    //    저장/수정 : 1) 기본키가(부서번호) 없으면 저장(insert)
//               2) 기본키가(부서번호) 있으면 수정(update)
//           => JPA 내부적으로 if문 있음 : 알아서 실행됨
    public void save(MeetingRoomDto meetingRoomDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        MeetingRoom meetingRoom=mapStruct.toEntity(meetingRoomDto);
        meetingRepository.save(meetingRoom);
    }

    public MeetingRoomDto findById(long mid) {
//        JPA 상세조회 함수 실행
        MeetingRoom meetingRoom = meetingRepository.findById(mid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));

        return mapStruct.toDto(meetingRoom);
    }

    @Transactional
    public void updateFromDto(MeetingRoomDto meetingRoomDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        MeetingRoom meetingRoom=meetingRepository.findById(meetingRoomDto.getMid())
                .orElseThrow(() -> new RuntimeException("정보를 찾을 수 없습니다."));

        mapStruct.updateFromDto(meetingRoomDto, meetingRoom);
//        meetingRepository.save(meetingRoom);     // dirty checking 으로 인해 필요없음
    }

    //    삭제 함수
    public void deleteById(long mid) {
        meetingRepository.deleteById(mid);
    }
}
