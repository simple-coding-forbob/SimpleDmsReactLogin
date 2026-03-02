package com.simplecoding.simpledmsreactlogin.meetingroom.service;

import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import com.simplecoding.simpledmsreactlogin.reservation.dto.ReservationDto;
import com.simplecoding.simpledmsreactlogin.reservation.service.ReservationService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashSet;
import java.util.Set;


@Log4j2
@SpringBootTest
class ReservationServiceTest {

    @Autowired
    private ReservationService reservationService;

    //  TODO: 테스트 하기 전에 항상 실행되는 메소드입니다. 테스트 전에 강제 로그인 시킵니다.
    @BeforeEach
    void setUp() {
        String email="forbob@naver.com";  // 계정
        String password="123456";         // 암호
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_ADMIN");
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(authority);       // 권한들
        Long eno=7788L;

        SecurityUserDto securityUserDto = new SecurityUserDto(email, password, authorities, eno);

        // 인증 유저 만들기
        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(securityUserDto, securityUserDto.getPassword(), authorities);

        // 강제 로그인 된 상태가 됩니다, 이제 아래 테스트를 하시면 로그인 된 상태로 테스트 됩니다.
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    void selectByMeetingRoom() {
//        1) 테스트 준비:
        String searchKeyword="";
        Pageable pageable= PageRequest.of(0, 3);
//        2) 테스트 실행:
        Page<ReservationDto> pages=reservationService.selectByReservationList(searchKeyword,pageable);
//        3) 검증 확인:
        log.info("pages={}",pages.getContent());
    }
}