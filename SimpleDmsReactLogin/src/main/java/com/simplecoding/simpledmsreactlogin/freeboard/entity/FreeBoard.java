package com.simplecoding.simpledmsreactlogin.freeboard.entity;


import com.simplecoding.simpledmsreactlogin.auth.entity.Member;
import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_FREE_BOARD")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "fid", callSuper = false)
public class FreeBoard extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fid;
    private String title;
    private String content;
    private Long viewCount=(long)0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")           // DB FK 컬럼명 작성
    private Member member;
}
