package com.simplecoding.simpledmsreactlogin.template.repository;

import com.simplecoding.simpledmsreactlogin.template.dto.TemplateDto;
import com.simplecoding.simpledmsreactlogin.template.entity.Template;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {

    @Query(value = "select new com.simplecoding.simpledmsreactlogin.template.dto" +
            ".TemplateDto(t.tid, t.title, t.content,t.fileName) " +
            "from Template t " +
            "where t.title like %:searchKeyword% " +
            "order by t.insertTime desc")
    Page<TemplateDto> selectTemplateList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );


    @Query(value = "select count(t) " +
            "from Template t " +
            "where t.fileName=:fileName")
    long countByFileName(
            @Param("fileName") String fileName
    );


    @Query(value = "select new com.simplecoding.simpledmsreactlogin.template.dto" +
            ".TemplateDto(t.tid, t.title, t.content,t.fileName) " +
            "from Template t " +
            "order by t.insertTime desc")
    List<TemplateDto> selectAll();
}