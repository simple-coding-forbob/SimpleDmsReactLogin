package com.simplecoding.simpledmsreactlogin.config;

import com.simplecoding.simpledmsreactlogin.common.jwt.AuthTokenFilter;
import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter(); // 개발자가 작성한 웹토큰 인증필터 생성자 함수
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()           // jsp redirection 사용 허용
                        .dispatcherTypeMatchers(DispatcherType.INCLUDE).permitAll()           // jsp:include 사용 허용
                        .requestMatchers("/auth/**", "/","/errors","/css/**","/images/**","/js/**").permitAll()
                        .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN") // admin 메뉴는 ROLE_ADMIN 만 가능
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/auth/login")                                // 사용자 정의 로그인 페이지
                        .loginProcessingUrl("/auth/loginProcess")                // 로그인 처리 URL
                        .usernameParameter("email")                              // form에서 name="email"
                        .defaultSuccessUrl("/", true)     // 로그인 성공 시 이동
                        .failureUrl("/errors") // 실패 시 이동
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/auth/logout")
                        .logoutSuccessUrl("/auth/login")
                        .permitAll()
                );

        return http.build();
    }
}
