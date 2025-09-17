package com.simplecoding.simpledmsreactlogin.auth.controller;

import com.simplecoding.simpledmsreactlogin.auth.dto.MemberDto;
import com.simplecoding.simpledmsreactlogin.auth.service.MemberService;
import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;

    //    로그인 함수
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(
            @RequestBody MemberDto memberDto) {
//        클래스위에 커서 두고 : CTRL + B
        String accessToken = memberService.login(memberDto);
        ApiResponse<String> response = new ApiResponse<>(true,
                "토큰 발급", accessToken, 0, 0);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> save(@RequestBody MemberDto memberDto) {
        memberService.save(memberDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
