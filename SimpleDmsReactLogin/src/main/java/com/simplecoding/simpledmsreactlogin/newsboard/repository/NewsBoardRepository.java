package com.simplecoding.simpledmsreactlogin.newsboard.repository;

import com.simplecoding.simpledmsreactlogin.newsboard.dto.NewsBoardDto;
import com.simplecoding.simpledmsreactlogin.newsboard.entity.NewsBoard;
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
public interface NewsBoardRepository extends JpaRepository<NewsBoard,Long> {
    @Query(value = "select new com.simplecoding.simpledmsreactlogin.newsboard.dto" +
            ".NewsBoardDto(n.nid,n.subject,n.text,n.viewCount,n.member.email,n.member.name)\n" +
            "from NewsBoard n\n" +
            "where n.subject like %:searchKeyword% order by n.insertTime desc")
    Page<NewsBoardDto> selectNewsBoardList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );

    @EntityGraph(attributePaths = {"member"})
    @Query(value = "select n from NewsBoard n\n" +
            "where n.nid = :nid")
    Optional<NewsBoard> selectById(@Param("nid") Long nid);


    @Modifying
    @Query("UPDATE NewsBoard f SET f.viewCount = f.viewCount + 1 WHERE f.nid = :nid")
    int increaseViewCount(@Param("nid") Long nid);
}
