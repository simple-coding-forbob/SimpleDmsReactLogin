package com.simplecoding.simpledmsreactlogin.qna.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class QnaDto {
    private Long qno;
    @NotBlank
    private String questioner;
    @NotBlank
    private String question;
    @NotBlank
    private String answerer;
    @NotBlank
    private String answer;
}
