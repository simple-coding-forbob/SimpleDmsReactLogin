package com.simplecoding.simpledmsreactlogin.auth.service;

import com.simplecoding.simpledmsreactlogin.auth.dto.MemberDto;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Log4j2
@SpringBootTest
class MemberServiceTest {

    @Autowired
    MemberService memberService;

    @Test
    void save() {
        //		1) 테스트 조건: Dept(dno,dname,loc)
        MemberDto memberDto=new MemberDto();
        memberDto.setEmail("forbob3@naver.com");
        memberDto.setPassword("forbob");
        memberDto.setName("홍길동");
        memberDto.setCodeName("ROLE_ADMIN");
//		2) 실제 메소드실행
        memberService.save(memberDto);
//		3) 검증(확인): 로그 , DB 확인, assert~ (DB확인)
    }

    @Test
    void login() {
//        1) 조건:
        MemberDto memberDto = new MemberDto();
        memberDto.setEmail("forbob@naver.com");
        memberDto.setPassword("123456");

//        2) 실행:
        String  jwt= memberService.login(memberDto);
//        3) 검증:
        log.info("jwt:{}",jwt);
    }
}