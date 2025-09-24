package com.simplecoding.simpledmsreactlogin.reservation.repository;

import com.simplecoding.simpledmsreactlogin.reservation.dto.ReservationDto;
import com.simplecoding.simpledmsreactlogin.reservation.entity.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT new com.simplecoding.simpledmsreactlogin.reservation.dto.ReservationDto(" +
            "r.rid, r.member.email,r.meetingRoom.mid,r.meetingRoom.roomName, r.startTime, r.endTime, r.status)\n" +
            "FROM Reservation r\n" +
            "WHERE r.meetingRoom.roomName like %:searchKeyword%\n" +
            "order by r.insertTime desc")
    Page<ReservationDto> selectByReservationList(@Param("searchKeyword") String searchKeyword,  Pageable pageable);

    @EntityGraph(attributePaths = {"member","meetingRoom"})
    @Query(value = "select r from Reservation r\n" +
            "where r.rid = :rid")
    Optional<Reservation> selectById(@Param("rid") Long rid);
}
