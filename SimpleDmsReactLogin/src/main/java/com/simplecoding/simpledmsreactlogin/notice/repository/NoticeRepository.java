package com.simplecoding.simpledmsreactlogin.notice.repository;


import com.simplecoding.simpledmsreactlogin.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    @Query(value = "select n from Notice n\n" +
            "where n.title like %:searchKeyword% order by n.insertTime")
    Page<Notice> selectNoticeList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
