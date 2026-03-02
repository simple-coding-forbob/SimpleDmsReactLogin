package com.simplecoding.simpledmsreactlogin.publiccar.repository;

import com.simplecoding.simpledmsreactlogin.meetingroom.dto.MeetingRoomDto;
import com.simplecoding.simpledmsreactlogin.publiccar.dto.PublicCarDto;
import com.simplecoding.simpledmsreactlogin.publiccar.entity.PublicCar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicCarRepository extends JpaRepository<PublicCar, Long> {
    @Query(value = "select new com.simplecoding.simpledmsreactlogin.publiccar.dto" +
            ".PublicCarDto(p.pid, p.carName, p.floor,p.capacity) " +
            "from PublicCar p\n" +
            "where p.carName like %:searchKeyword% order by p.insertTime desc")
    Page<PublicCarDto> selectPublicCarList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
