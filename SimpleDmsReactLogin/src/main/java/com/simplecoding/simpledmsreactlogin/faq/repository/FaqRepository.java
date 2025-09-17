package com.simplecoding.simpledmsreactlogin.faq.repository;


import com.simplecoding.simpledmsreactlogin.faq.entity.Faq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FaqRepository extends JpaRepository<Faq,Long> {
    @Query(value = "select f from Faq f\n" +
            "where f.title like %:searchKeyword%")
    Page<Faq> selectFaqList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
