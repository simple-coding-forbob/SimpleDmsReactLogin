package com.simplecoding.simpledmsreactlogin.newsboard.entity;

import com.simplecoding.simpledmsreactlogin.auth.entity.Member;
import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_NEWS_BOARD")
@SequenceGenerator(
        name = "SQ_NEWS_BOARD_JPA",
        sequenceName = "SQ_NEWS_BOARD",
        initialValue = 1,
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "nid", callSuper = false)
public class NewsBoard extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_NEWS_BOARD_JPA")
    private Long nid;
    private String subject;
    private String text;
    private Long viewCount = 0L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private Member member;
}
