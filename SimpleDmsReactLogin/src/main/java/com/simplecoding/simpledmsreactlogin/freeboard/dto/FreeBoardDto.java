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
    private String author;
    private Long viewCount;
}
