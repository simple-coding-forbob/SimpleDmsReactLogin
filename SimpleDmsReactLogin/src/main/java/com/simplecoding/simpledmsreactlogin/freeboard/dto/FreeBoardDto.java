package com.simplecoding.simpledmsreactlogin.freeboard.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FreeBoardDto {
    private Long fid;
    private String title;
    private String content;
    private Long viewCount=(long)0;
    private String email;
    private String name;      // 이름(닉네임), N+1 터질수 있음(조심)
}
