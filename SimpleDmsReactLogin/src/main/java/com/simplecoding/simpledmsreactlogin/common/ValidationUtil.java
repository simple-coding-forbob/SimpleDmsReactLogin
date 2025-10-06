package com.simplecoding.simpledmsreactlogin.common;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
@Log4j2
public class ValidationUtil {

    private final ErrorMsg errorMsg;

    public void checkBindingResult(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 로그로 상세 에러
            bindingResult.getAllErrors()
                    .forEach(error -> log.error(error.getDefaultMessage()));

            // 통합 메시지
            throw new RuntimeException(errorMsg.getMessage("errors.validation.common"));
        }
    }
}

