package com.simplecoding.simpledmsreactlogin.auth.dto;

import lombok.*;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class JwtDto {
    private String accessToken;   // 웹토큰
    private final String tokenType = "Bearer"; // 토큰 형태(고정)
}
