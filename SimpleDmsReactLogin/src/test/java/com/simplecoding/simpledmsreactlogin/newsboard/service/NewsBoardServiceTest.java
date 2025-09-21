package com.simplecoding.simpledmsreactlogin.newsboard.service;

import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;

import com.simplecoding.simpledmsreactlogin.newsboard.dto.NewsBoardDto;
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

import static org.junit.jupiter.api.Assertions.*;

@Log4j2
@SpringBootTest
class NewsBoardServiceTest {
    @Autowired
    private NewsBoardService newsBoardService;

    //  TODO: 테스트 하기 전에 항상 실행되는 메소드입니다. 테스트 전에 강제 로그인 시킵니다.
    @BeforeEach
    void setUp() {
        String email="forbob@naver.com";  // 계정
        String password="123456";         // 암호
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_ADMIN");
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(authority);       // 권한들

        SecurityUserDto securityUserDto = new SecurityUserDto(email, password, authorities);

        // 인증 유저 만들기
        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(securityUserDto, securityUserDto.getPassword(), authorities);

        // 강제 로그인 된 상태가 됩니다, 이제 아래 테스트를 하시면 로그인 된 상태로 테스트 됩니다.
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    void selectNewsBoardList() {
        Pageable pageable= PageRequest.of(0, 3);
        String searchKeyword="";
        Page<NewsBoardDto> page=newsBoardService.selectNewsBoardList(searchKeyword, pageable);
        log.info(page.getContent());

    }

    @Test
    void findById() {
        Long nid=(long)1;
        NewsBoardDto newsBoardDto=newsBoardService.findById(nid);
        log.info(newsBoardDto);

    }

    @Test
    void updateFromDto() {
        //		1) 테스트 조건:
        NewsBoardDto newsBoardDto=new NewsBoardDto();
        newsBoardDto.setNid((long)1);
        newsBoardDto.setSubject("제목");
        newsBoardDto.setText("내용2");

        newsBoardService.updateFromDto(newsBoardDto);
    }

    @Test
    void deleteById() {
        Long fid=(long)6;
        newsBoardService.deleteById(fid);
    }
}