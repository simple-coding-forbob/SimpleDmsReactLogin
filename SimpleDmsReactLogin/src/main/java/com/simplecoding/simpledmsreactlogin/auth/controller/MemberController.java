package com.simplecoding.simpledmsreactlogin.auth.controller;

import com.simplecoding.simpledmsreactlogin.auth.dto.MemberDto;
import com.simplecoding.simpledmsreactlogin.auth.dto.MypageDto;
import com.simplecoding.simpledmsreactlogin.auth.service.MemberService;
import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

// swagger 주소:

@Log4j2
@RestController
@RequiredArgsConstructor
@Tag(name = "MemberController", description = "회원 API 문서")
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;
    private final CommonUtil commonUtil;

    //    로그인 함수
    @PostMapping("/auth/login")
    @Operation(summary = "로그인", description = "회원이 로그인합니다.")
    public ResponseEntity<Void> login(@RequestBody MemberDto memberDto) {

        // 1) 서비스에서 JWT 발급
        String jwt = memberService.login(memberDto);

        // 2) httpOnly 쿠키 생성
        ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
                .httpOnly(true)            // JS에서 접근 불가
                .path("/")                 // 전체 도메인 적용
                .build();

        // 3) 응답 헤더에 쿠키 추가 + 본문 없이 200 OK
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }

    @Operation(summary = "회원가입", description = "회원 가입합니다.")
    @PostMapping("/auth/register")
    public ResponseEntity<Void> save(@Parameter(description = "회웑 가입 정보") @Valid @RequestBody MemberDto memberDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        memberService.save(memberDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "마이페이지", description = "마이 페이지입니다.")
    @GetMapping("/mypage")
    public ResponseEntity<ApiResponse<MypageDto>> getMypage (@Parameter(description = "웹토큰") Authentication authentication) {
        // Spring Security가 이미 인증 완료 → 인증 객체에서 사용자 정보 가져오기
        String email = authentication.getName();

        MypageDto mypageDto = memberService.getMypage(email);

        return ResponseEntity.ok(new ApiResponse<>(true, "조회 성공", mypageDto, 0, 0));
    }

    @PostMapping("/auth/logout")
    @Operation(summary = "로그아웃", description = "로그아웃합니다.")
    public ResponseEntity<Void> logout() {
        // 1) 쿠키를 비우고 바로 만료 처리
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)   // JS 접근 불가
                .path("/")        // 전체 도메인 적용
                .maxAge(0)        // 즉시 만료(로그아웃)
                .build();

        // 2) 응답 헤더에 쿠키 추가
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }

    @Operation(summary = "로그인 상태 확인", description = "현재 로그인 상태를 확인합니다.")
    @GetMapping("/auth/me")
    public ResponseEntity<ApiResponse<Void>> me() {
        // AuthTokenFilter에서 인증 성공 → SecurityContext에 인증 정보 있음
        log.info("성공");
        return ResponseEntity.ok().build();
    }
}
