package com.simplecoding.simpledmsreactlogin.faq.repository;


import com.simplecoding.simpledmsreactlogin.faq.dto.FaqDto;
import com.simplecoding.simpledmsreactlogin.faq.entity.Faq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FaqRepository extends JpaRepository<Faq,Long> {
    @Query(value = "select new com.simplecoding.simpledmsreactlogin.faq.dto" +
            ".FaqDto(f.fno,f.title,f.content) " +
            "from Faq f\n" +
            "where f.title like %:searchKeyword% order by f.insertTime desc")
    Page<FaqDto> selectFaqList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
