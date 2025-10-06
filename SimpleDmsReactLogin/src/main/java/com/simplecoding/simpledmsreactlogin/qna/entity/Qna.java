package com.simplecoding.simpledmsreactlogin.qna.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_QNA")
@SequenceGenerator(
        name = "SQ_QNA_JPA",
        sequenceName = "SQ_QNA",
        initialValue = 1,
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "qno", callSuper = false)
public class Qna extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_QNA_JPA")
    private Long qno;
    private String questioner;
    private String question;
    private String answerer;
    private String answer;
}
