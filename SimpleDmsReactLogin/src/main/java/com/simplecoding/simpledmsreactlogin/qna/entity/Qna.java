package com.simplecoding.simpledmsreactlogin.qna.entity;


import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_QNA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "qno", callSuper = false)
public class Qna extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qno;
    private String questioner;
    private String question;
    private String answerer;
    private String answer;
}
