package com.simplecoding.simpledmsreactlogin.document.repository;

import com.simplecoding.simpledmsreactlogin.document.dto.DocumentDto;
import com.simplecoding.simpledmsreactlogin.document.entity.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, String> {
    @Query(value = "select new com.simplecoding.simpledmsreactlogin.document.dto.DocumentDto(" +
            "d.uuid, d.title, d.content, d.emp.eno, d.fileName, d.fileUrl) " +
            "from Document d\n" +
            "where d.title like %:searchKeyword% order by d.insertTime desc")
    Page<DocumentDto> selectDocumentList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
