package com.simplecoding.simpledmsreactlogin.auth.entity;


import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import com.simplecoding.simpledmsreactlogin.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="TB_MEMBER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member extends BaseTimeEntity {
    @Id
    private String email;
    private String password;
    private String name;     // 유저명
    private String codeName="ROLE_USER"; // 권한명 ( ROLE_USER, ROLE_ADMIN )
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eno")
    private Emp emp;
}
