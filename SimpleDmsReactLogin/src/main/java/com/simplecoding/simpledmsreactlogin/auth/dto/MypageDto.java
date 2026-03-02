package com.simplecoding.simpledmsreactlogin.auth.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MypageDto {
    private String email;
    private String name;     // 유저명
}
