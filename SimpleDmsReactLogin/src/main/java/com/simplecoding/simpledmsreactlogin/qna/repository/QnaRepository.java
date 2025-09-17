package com.simplecoding.simpledmsreactlogin.qna.repository;


import com.simplecoding.simpledmsreactlogin.qna.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QnaRepository extends JpaRepository<Qna,Long> {
    @Query(value = "select q from Qna q\n" +
            "where q.question like %:searchKeyword%")
    Page<Qna> selectQnaList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
