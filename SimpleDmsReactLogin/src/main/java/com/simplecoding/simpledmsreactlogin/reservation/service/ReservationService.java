package com.simplecoding.simpledmsreactlogin.reservation.service;

import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.reservation.dto.ReservationDto;
import com.simplecoding.simpledmsreactlogin.reservation.entity.Reservation;
import com.simplecoding.simpledmsreactlogin.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    public Page<ReservationDto> selectByReservationList(String searchKeyword, Pageable pageable) {
        return reservationRepository.selectByReservationList(searchKeyword, pageable);
    }

    @Transactional
    public ReservationDto selectById(long rid) {
//        JPA 상세조회 함수 실행
        Reservation reservation= reservationRepository.selectById(rid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        return mapStruct.toDto(reservation);
    }

    //    저장/수정 : 1) 기본키가(부서번호) 없으면 저장(insert)
//               2) 기본키가(부서번호) 있으면 수정(update)
//           => JPA 내부적으로 if문 있음 : 알아서 실행됨
    public void save(ReservationDto reservationDto) {
//        해당 날짜에 예약이 있는지 확인-> 있으면 예외처리
        if(reservationRepository.existsByReservation(reservationDto.getStartTime(), reservationDto.getEndTime(), reservationDto.getMid()) > 0) {
            throw new RuntimeException(commonUtil.getMessage("errors.reservation"));
        }

//        JPA 저장 함수 실행 : return 값 : 저장된 객체
//      TODO: 1) 시큐리티에서 email 가져오기: 화면에서 전송안함
        SecurityUserDto securityUserDto =commonUtil.getLoginUser();
        reservationDto.setEmail(securityUserDto.getUsername());
//      TODO: 2) 저장하기
        Reservation reservation= mapStruct.toEntity(reservationDto);
        reservationRepository.save(reservation);
    }

    @Transactional
    public void updateFromDto(ReservationDto reservationDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        Reservation reservation=reservationRepository.findById(reservationDto.getRid())
                .orElseThrow(() -> new RuntimeException("errors.not.found"));
//      TODO: 1) 시큐리티에서 email 가져오기: 화면에서 전송안함
        SecurityUserDto securityUserDto =commonUtil.getLoginUser();
        reservationDto.setEmail(securityUserDto.getUsername());

        mapStruct.updateFromDto(reservationDto, reservation);
    }

    //    삭제 함수
    public void deleteById(long rid) {
        reservationRepository.deleteById(rid);
    }
}
