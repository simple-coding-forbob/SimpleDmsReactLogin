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
@SequenceGenerator(
        name = "SQ_BOOKING_JPA",
        sequenceName = "SQ_BOOKING",
        initialValue = 1,
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "bid", callSuper = false)
public class Booking extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_BOOKING_JPA")
    private Long bid;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private Member member; // FK: Member
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pid")
    private PublicCar publicCar; // FK: PublicCar
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Enumerated(EnumType.STRING)
    private ReservationStatus status = ReservationStatus.R; // R: 예약
}
