package com.simplecoding.simpledmsreactlogin.meetingroom.entity;

import com.simplecoding.simpledmsreactlogin.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TB_MEETING_ROOM")
@SequenceGenerator(
        name = "SQ_MEETING_ROOM_JPA",
        sequenceName = "SQ_MEETING_ROOM",
        initialValue = 1,
        allocationSize = 1
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "mid", callSuper = false)
public class MeetingRoom extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_MEETING_ROOM_JPA")
    private Long mid;
    private String roomName;
    private String loc;
    private Long capacity;
}
