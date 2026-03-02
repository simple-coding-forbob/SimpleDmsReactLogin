package com.simplecoding.simpledmsreactlogin.common;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@Log4j2
@RestControllerAdvice
@RequiredArgsConstructor
public class CommonException {

    // ResponseStatusException 처리 (예: 404, 400 등)
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiResponse> handleResponseStatusException(ResponseStatusException e) {
        log.error("에러 발생: {}", e);

        ApiResponse response = new ApiResponse<>();
        response.setSuccess(false);
        response.setMessage(e.getMessage());       // ResponseStatusException에 담긴 메시지: 개발자가 에러발생시킴

        return ResponseEntity.status(e.getStatusCode()).body(response);
    }

    // 위에서 잡히지 않는 모든 예외 처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleAllException(Exception e) {
        log.error("벡엔드 서버 오류가 발생했습니다.", e);

        ApiResponse response = new ApiResponse<>();
        response.setSuccess(false);
//        response.setMessage(e.getMessage() != null ? e.getMessage() : "벡엔드 서버 오류가 발생했습니다.");
        response.setMessage(e.getMessage());

        return ResponseEntity.status(500).body(response);
    }
}
