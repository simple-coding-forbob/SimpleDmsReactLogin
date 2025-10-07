package com.simplecoding.simpledmsreactlogin.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "password")
public class MemberDto {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    private String name;     // 유저명
    private String codeName="ROLE_USER"; // 권한명 ( ROLE_USER, ROLE_ADMIN )
    private Long eno;
}
