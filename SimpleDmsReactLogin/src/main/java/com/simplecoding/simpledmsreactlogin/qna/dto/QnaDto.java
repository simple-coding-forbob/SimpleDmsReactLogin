package com.simplecoding.simpledmsreactlogin.qna.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class QnaDto {
    private Long qno;
    private String questioner;
    private String question;
    private String answerer;
    private String answer;
}
