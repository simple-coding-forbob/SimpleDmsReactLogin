package com.simplecoding.simpledmsreactlogin.auth.service;


import com.simplecoding.simpledmsreactlogin.auth.dto.JwtDto;
import com.simplecoding.simpledmsreactlogin.auth.dto.MemberDto;
import com.simplecoding.simpledmsreactlogin.auth.dto.MypageDto;
import com.simplecoding.simpledmsreactlogin.auth.entity.Member;
import com.simplecoding.simpledmsreactlogin.auth.repository.MemberRepository;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.common.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MapStruct mapStruct;
    private final PasswordEncoder passwordEncoder;
    private final CommonUtil commonUtil;

    //    인증/권한 체크 클래스(id/pwd 체크)
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtUtils jwtUtils;   // 웹토큰

//    회원가입(insert) : 패스워드(암호화)
    public void save(MemberDto memberDto) {
        if (memberRepository.existsById(memberDto.getEmail())) {
            throw new RuntimeException(commonUtil.getMessage("errors.register"));
        }
        String encodedPassword = passwordEncoder.encode(memberDto.getPassword());
        // 비밀번호 암호화
        memberDto.setPassword(encodedPassword);
        Member member=mapStruct.toEntity(memberDto);
        memberRepository.save(member);
    }

//    TODO: 로그인 , DTO 필요(택배상자)
    public JwtDto login(MemberDto memberDto) {
//        (1) id/pwd 인증(확인) : 통과
//        TODO: (참고) .authenticate() => UserDetailsServiceImple 상세조회 함수가 실행됨
//              (참고) Authentication 객체 == 인증된객체 (유저)
        Authentication authentication
                = authenticationManagerBuilder.getObject().authenticate(
                new UsernamePasswordAuthenticationToken(memberDto.getEmail(),
                        memberDto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication); //        (2) 통과된 유저들 => 필통(홀더)에 보관 : 인증완료
        String accessToken = jwtUtils.generateJwtToken(authentication);       //        (3) 웹토큰 발급(벡엔드) : 카드패스(호텔카드키)
        JwtDto jwtDto = new JwtDto(
                accessToken                // 웹토큰
        );
        return jwtDto;                                                   //        (5) 택배상자(DTO)에 담기 : 1) 웹토큰, 2) 유저정보
    }

    public MypageDto findById(String email) {
        //        JPA 상세조회 함수 실행
        Member member = memberRepository.findById(email)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));

        return mapStruct.toDto2(member);
    }
}
