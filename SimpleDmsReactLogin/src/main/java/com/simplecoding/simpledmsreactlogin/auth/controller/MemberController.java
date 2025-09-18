package com.simplecoding.simpledmsreactlogin.auth.controller;

import com.simplecoding.simpledmsreactlogin.auth.dto.JwtDto;
import com.simplecoding.simpledmsreactlogin.auth.dto.MemberDto;
import com.simplecoding.simpledmsreactlogin.auth.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
    public ResponseEntity<JwtDto> login(
            @RequestBody MemberDto memberDto) {
        JwtDto jwtDto = memberService.login(memberDto);
        return ResponseEntity.ok(jwtDto);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Void> save(@RequestBody MemberDto memberDto) {
        memberService.save(memberDto);
        return ResponseEntity.ok().build();
    }
}
