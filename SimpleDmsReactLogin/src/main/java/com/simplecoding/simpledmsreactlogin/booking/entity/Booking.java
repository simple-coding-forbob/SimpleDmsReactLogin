package com.simplecoding.simpledmsreactlogin.booking.entity;

import com.simplecoding.simpledmsreactlogin.auth.entity.Member;
import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import com.simplecoding.simpledmsreactlogin.common.enums.ReservationStatus;
import com.simplecoding.simpledmsreactlogin.publiccar.entity.PublicCar;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_BOOKING")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "bid", callSuper = false)
public class Booking extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bid;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private Member member;                               // fk: Member
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pid")
    private PublicCar publicCar;                          // fk: PublicCar
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Enumerated(EnumType.STRING)                           // db 에 상수명 저장
    private ReservationStatus status=ReservationStatus.R;  // 코드설명, 기본(R:예약)
}
