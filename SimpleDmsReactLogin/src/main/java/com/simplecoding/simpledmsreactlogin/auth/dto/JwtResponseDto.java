package com.simplecoding.simpledmsreactlogin.auth.dto;

import lombok.*;

@Getter
@ToString
@AllArgsConstructor
public class JwtResponseDto {
    private String accessToken;          // 웹토큰
    private final String tokenType = "Bearer"; // 토큰종류 : 고정

    private String email;                // 유저 이메일
    private String codeName;             // 권한명
}
