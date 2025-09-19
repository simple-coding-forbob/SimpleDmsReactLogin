package com.simplecoding.simpledmsreactlogin.common.jwt;

import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * JWT 토큰 생성 및 검증 유틸리티
 */
@Slf4j
@Component
public class JwtUtils {

    @Value("${simpleDms.app.jwtSecret}")
    private String jwtSecret;                  // JWT 서명용 비밀키

    @Value("${simpleDms.app.jwtExpirationMs}")
    private int jwtExpirationMs;               // 토큰 만료 시간 (밀리초)

    /**
     * JWT 토큰 생성
     * @param authentication 인증 정보
     * @return JWT 문자열
     */
    public String generateJwtToken(Authentication authentication) {
        // Spring Security 인증 객체에서 사용자 정보 가져오기
        SecurityUserDto securityUserDto = (SecurityUserDto) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(securityUserDto.getUsername())          // JWT subject: 이메일
                .setIssuedAt(new Date())                            // 발급일
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs)) // 만료일
                .signWith(SignatureAlgorithm.HS512, jwtSecret)     // HS512 서명
                .compact();                                        // JWT 문자열 생성
    }

    /**
     * JWT에서 사용자 이메일 추출
     * @param token JWT
     * @return 이메일(subject)
     */
    public String getUserNameFromJwt(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)         // 비밀키 설정
                .parseClaimsJws(token)            // JWT 파싱
                .getBody()                        // claims(body) 접근
                .getSubject();                    // subject(email) 반환
    }

    /**
     * JWT 유효성 검증
     * @param authToken JWT
     * @return true: 유효, false: 위조/만료/형식 오류
     */
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            log.error("JWT 서명 오류: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("잘못된 JWT 형식: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT 만료: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT 클레임이 비어 있음: {}", e.getMessage());
        }
        return false;
    }

    /**
     * 요청 헤더에서 JWT 토큰 추출
     * Authorization 헤더 예시: "Bearer eyJhbGciOiJIUzUxMiJ9..."
     */
    public String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        // null 체크 및 "Bearer " 접두사 확인
        if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
            // "Bearer " 이후 문자열(토큰) 반환
            return headerAuth.substring(7);
        }
        return null; // 토큰 없으면 null 반환
    }
}
