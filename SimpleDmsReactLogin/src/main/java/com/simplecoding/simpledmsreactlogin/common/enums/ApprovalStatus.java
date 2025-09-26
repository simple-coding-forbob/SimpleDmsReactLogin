package com.simplecoding.simpledmsreactlogin.common.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ApprovalStatus {
    P( "대기"), A( "결재"), R( "반려");

    private final String description;

    public String getDescription() {
        return description;
    }
}
