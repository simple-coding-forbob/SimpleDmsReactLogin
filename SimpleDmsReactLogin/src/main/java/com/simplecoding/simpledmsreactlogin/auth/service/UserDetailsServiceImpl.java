package com.simplecoding.simpledmsreactlogin.auth.service;


import com.simplecoding.simpledmsreactlogin.auth.dto.SecurityUserDto;
import com.simplecoding.simpledmsreactlogin.auth.entity.Member;
import com.simplecoding.simpledmsreactlogin.auth.repository.MemberRepository;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    //    DB Member 레포지토리 DI
    private final MemberRepository memberRepository;
    private final CommonUtil commonUtil;

    //    함수 재정의 : 자동 기능 : alt + insert
    @Override
    public UserDetails loadUserByUsername(String username) {
        Member member
                = memberRepository.findById(username)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));

//        TODO: 2) 검증객체에 정보 넣기
//               2-1) 권한을 생성해서 넣기 : GrantedAuthority(스프링시큐리티 권한클래스)
//                 => codeName : 권한명 (ROLE_ADMIN, ROLE_USER)
//                 => 사용법 : GrantedAuthority 변수 = new SimpleGrantedAuthority(권한명);
        GrantedAuthority authority = new SimpleGrantedAuthority(member.getCodeName());

//        TODO:  2-2) 권한 배열에(List, Set 등) 넣기 : Set 에 넣기
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(authority);    // Set 배열에 권한 넣기

//        생성자 : (email, password, 권한배열)
        return new SecurityUserDto(member.getEmail(),
                member.getPassword(),
                authorities,
                member.getEmp().getEno()
        );
    }
}
