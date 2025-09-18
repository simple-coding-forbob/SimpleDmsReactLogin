package com.simplecoding.simpledmsreactlogin.auth.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "password")
public class MemberDto {
    private String email;
    private String password;
    private String name;     // 유저명
    private String codeName="ROLE_USER"; // 권한명 ( ROLE_USER, ROLE_ADMIN )
}
