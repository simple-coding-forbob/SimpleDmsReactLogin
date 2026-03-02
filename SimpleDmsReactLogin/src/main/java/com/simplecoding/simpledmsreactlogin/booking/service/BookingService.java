package com.simplecoding.simpledmsreactlogin.booking.service;

import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import com.simplecoding.simpledmsreactlogin.booking.repository.BookingRepository;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.booking.dto.BookingDto;
import com.simplecoding.simpledmsreactlogin.booking.entity.Booking;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    public Page<BookingDto> selectByBookingList(String searchKeyword, Pageable pageable) {
        return bookingRepository.selectByBookingList(searchKeyword,pageable);
    }

    @Transactional
    public BookingDto selectById(long bid) {
//        JPA 상세조회 함수 실행
        Booking booking= bookingRepository.selectById(bid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));
        return mapStruct.toDto(booking);
    }

    //    저장/수정 : 1) 기본키가(부서번호) 없으면 저장(insert)
//               2) 기본키가(부서번호) 있으면 수정(update)
//           => JPA 내부적으로 if문 있음 : 알아서 실행됨
    public void save(BookingDto bookingDto) {
//        해당 날짜에 예약이 있는지 확인-> 있으면 예외처리
        if(bookingRepository.existsByBooking(bookingDto.getStartTime(), bookingDto.getEndTime(), bookingDto.getPid()) > 0) {
            throw new RuntimeException(commonUtil.getMessage("errors.booking"));
        }

//        JPA 저장 함수 실행 : return 값 : 저장된 객체
//      TODO: 1) 시큐리티에서 email 가져오기: 화면에서 전송안함
        SecurityUserDto securityUserDto =commonUtil.getLoginUser();
        bookingDto.setEmail(securityUserDto.getUsername());
//      TODO: 2) 저장하기
        Booking booking= mapStruct.toEntity(bookingDto);
        bookingRepository.save(booking);
    }

    @Transactional
    public void updateFromDto(BookingDto bookingDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        Booking booking=bookingRepository.findById(bookingDto.getBid())
                .orElseThrow(() -> new RuntimeException("errors.not.found"));
//      TODO: 1) 시큐리티에서 email 가져오기: 화면에서 전송안함
        SecurityUserDto securityUserDto =commonUtil.getLoginUser();
        bookingDto.setEmail(securityUserDto.getUsername());

        mapStruct.updateFromDto(bookingDto, booking);
    }

    //    삭제 함수
    public void deleteById(long bid) {
        bookingRepository.deleteById(bid);
    }
}
