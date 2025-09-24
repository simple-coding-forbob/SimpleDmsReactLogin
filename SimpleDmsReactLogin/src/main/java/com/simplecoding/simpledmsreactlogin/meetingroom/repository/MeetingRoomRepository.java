package com.simplecoding.simpledmsreactlogin.meetingroom.repository;

import com.simplecoding.simpledmsreactlogin.meetingroom.dto.MeetingRoomDto;
import com.simplecoding.simpledmsreactlogin.meetingroom.entity.MeetingRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Long> {
    @Query(value = "select new com.simplecoding.simpledmsreactlogin.meetingroom.dto" +
            ".MeetingRoomDto(m.mid, m.roomName, m.loc,m.capacity) " +
            "from MeetingRoom m\n" +
            "where m.roomName like %:searchKeyword% order by m.insertTime desc")
    Page<MeetingRoomDto> selectMeetingRoomList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
