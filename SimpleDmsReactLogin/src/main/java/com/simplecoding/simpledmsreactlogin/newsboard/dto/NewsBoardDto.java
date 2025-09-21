package com.simplecoding.simpledmsreactlogin.newsboard.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NewsBoardDto {
    private Long nid;
    private String subject;
    private String text;
    private Long viewCount=(long)0;
    private String email;
    private String name;      // 이름(닉네임), N+1 터질수 있음(조심)
}
