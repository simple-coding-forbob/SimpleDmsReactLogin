package com.simplecoding.simpledmsreactlogin.reservation.entity;

import com.simplecoding.simpledmsreactlogin.auth.entity.Member;
import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import com.simplecoding.simpledmsreactlogin.common.enums.ReservationStatus;
import com.simplecoding.simpledmsreactlogin.meetingroom.entity.MeetingRoom;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_RESERVATION")
@SequenceGenerator(
        name = "SQ_RESERVATION_JPA",
        sequenceName = "SQ_RESERVATION",
        initialValue = 1,
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "rid", callSuper = false)
public class Reservation extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_RESERVATION_JPA")
    private Long rid;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mid")
    private MeetingRoom meetingRoom;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Enumerated(EnumType.STRING)
    private ReservationStatus status=ReservationStatus.R;
}
