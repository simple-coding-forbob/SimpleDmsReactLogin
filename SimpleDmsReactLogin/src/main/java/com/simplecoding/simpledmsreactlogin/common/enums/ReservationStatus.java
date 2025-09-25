package com.simplecoding.simpledmsreactlogin.common.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ReservationStatus {
    R( "예약"), C( "취소"), E( "종료");

    private final String description;

    @JsonValue
    public String getDescription() {
        return description;
    }
}
