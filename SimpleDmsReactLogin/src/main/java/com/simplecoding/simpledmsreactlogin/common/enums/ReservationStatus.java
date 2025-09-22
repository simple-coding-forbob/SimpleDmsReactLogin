package com.simplecoding.simpledmsreactlogin.common.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ReservationStatus {
    R( "예약중"), C( "취소됨"), E( "종료됨");

    private final String description;

    @JsonValue
    public String getDescription() {
        return description;
    }
}
