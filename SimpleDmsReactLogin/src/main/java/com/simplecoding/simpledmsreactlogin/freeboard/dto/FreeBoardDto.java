package com.simplecoding.simpledmsreactlogin.freeboard.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FreeBoardDto {
    private Long fid;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private Long viewCount=(long)0;
    private String email;
    private String name;      // 이름(닉네임), N+1 터질수 있음(조심)
}
