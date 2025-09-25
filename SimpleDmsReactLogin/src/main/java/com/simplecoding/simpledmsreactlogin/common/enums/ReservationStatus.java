package com.simplecoding.simpledmsreactlogin.common.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ReservationStatus {
    R( "예약"), C( "취소"), E( "종료");

    private final String description;

    public String getDescription() {
        return description;
    }
}
