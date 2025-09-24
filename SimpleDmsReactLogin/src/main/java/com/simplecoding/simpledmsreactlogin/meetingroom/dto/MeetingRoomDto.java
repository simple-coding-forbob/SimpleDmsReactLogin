package com.simplecoding.simpledmsreactlogin.meetingroom.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MeetingRoomDto {
    private Long mid;
    private String roomName;
    private String loc;
    private Long capacity;
}
