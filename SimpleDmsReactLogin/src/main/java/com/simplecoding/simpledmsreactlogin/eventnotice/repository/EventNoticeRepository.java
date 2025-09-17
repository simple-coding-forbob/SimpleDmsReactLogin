package com.simplecoding.simpledmsreactlogin.eventnotice.repository;


import com.simplecoding.simpledmsreactlogin.eventnotice.entity.EventNotice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EventNoticeRepository extends JpaRepository<EventNotice, Long> {
    @Query(value = "select n from EventNotice n\n" +
            "where n.subject like %:searchKeyword%")
    Page<EventNotice> selectEventNoticeList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
