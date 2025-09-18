package com.simplecoding.simpledmsreactlogin.auth.entity;


import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
}
