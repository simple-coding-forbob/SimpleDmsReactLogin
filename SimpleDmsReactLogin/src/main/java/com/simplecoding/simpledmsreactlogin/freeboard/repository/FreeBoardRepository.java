package com.simplecoding.simpledmsreactlogin.freeboard.repository;


import com.simplecoding.simpledmsreactlogin.freeboard.dto.FreeBoardDto;
import com.simplecoding.simpledmsreactlogin.freeboard.entity.FreeBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long> {
    @Query(value = "select new com.simplecoding.simpledmsreactlogin.freeboard.dto.FreeBoardDto(" +
            "f.fid,f.title,f.content,f.viewCount,f.member.email,f.member.name)" +
            " from FreeBoard f\n" +
            "where f.title like %:searchKeyword% order by f.insertTime desc")
    Page<FreeBoardDto> selectFreeBoardList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );

    @EntityGraph(attributePaths = {"member"})
    @Query(value = "select f from FreeBoard f\n" +
            "where f.fid = :fid")
    Optional<FreeBoard> selectById(@Param("fid") Long fid);

    @Modifying
    @Query("UPDATE FreeBoard f SET f.viewCount = f.viewCount + 1 WHERE f.fid = :fid")
    int increaseViewCount(@Param("fid") Long fid);
}
