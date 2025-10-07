package com.simplecoding.simpledmsreactlogin.auth.controller;

import com.simplecoding.simpledmsreactlogin.auth.dto.JwtDto;
import com.simplecoding.simpledmsreactlogin.auth.dto.MemberDto;
import com.simplecoding.simpledmsreactlogin.auth.dto.MypageDto;
import com.simplecoding.simpledmsreactlogin.auth.service.MemberService;
import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.jwt.JwtUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
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
    private final JwtUtils jwtUtils;
    private final CommonUtil commonUtil;

    //    로그인 함수
    @Operation(summary = "로그인", description = "회원이 로그인합니다.")
    @PostMapping("/auth/login")
    public ResponseEntity<JwtDto> login(
            @Parameter(description = "아이디, 비밀번호") @RequestBody MemberDto memberDto) {
        JwtDto jwtDto = memberService.login(memberDto);
        return ResponseEntity.ok(jwtDto);
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
    public ResponseEntity<ApiResponse<MypageDto>> getMypage (@Parameter(description = "웹토큰") HttpServletRequest request) {
        String jwt = jwtUtils.parseJwt(request);            // 1. "Bearer [JWT]"에서 토큰만 추출
        String email = jwtUtils.getUserNameFromJwt(jwt);    // 2. JWT 검증 및 Payload에서 이메일 추출

        // 3. DB에서 사용자 정보 조회
        MypageDto mypageDto = memberService.findById(email);
        ApiResponse<MypageDto> response = new ApiResponse<>(true, "조회 성공", mypageDto, 0, 0);

        return ResponseEntity.ok(response);
    }
}
