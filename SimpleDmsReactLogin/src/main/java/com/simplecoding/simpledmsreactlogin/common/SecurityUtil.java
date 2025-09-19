package com.simplecoding.simpledmsreactlogin.common;

import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {
    private final ErrorMsg errorMsg;

    public SecurityUserDto getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증 객체가 없거나 인증 안 된 경우
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException(errorMsg.getMessage("errors.unauthorized"));
        }

        Object principal = authentication.getPrincipal();

        // principal 이 SecurityUserDto 인 경우만 반환
        if (principal instanceof SecurityUserDto user) {
            return user;
        } else {
            throw new RuntimeException(errorMsg.getMessage("errors.unauthorized"));
        }
    }
}
