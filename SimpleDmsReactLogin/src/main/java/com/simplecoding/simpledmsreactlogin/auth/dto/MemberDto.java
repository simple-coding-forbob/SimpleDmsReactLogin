package com.simplecoding.simpledmsreactlogin.auth.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "password")
public class MemberDto {
    private String email;
    @JsonIgnore
    private String password;
    private String name;     // 유저명
    private String codeName; // 권한명 ( ROLE_USER, ROLE_ADMIN )
}
