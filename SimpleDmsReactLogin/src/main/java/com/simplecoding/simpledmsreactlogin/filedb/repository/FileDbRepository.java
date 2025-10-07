package com.simplecoding.simpledmsreactlogin.filedb.repository;


import com.simplecoding.simpledmsreactlogin.filedb.dto.FileDbDto;
import com.simplecoding.simpledmsreactlogin.filedb.entity.FileDb;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FileDbRepository extends JpaRepository<FileDb, String> {
    @Query(value = "select new com.simplecoding.simpledmsreactlogin.filedb.dto" +
            ".FileDbDto(f.uuid,f.fileTitle,f.fileContent, f.fileUrl) " +
            "from FileDb f\n" +
            "where f.fileTitle like %:searchKeyword% order by f.insertTime desc")
    Page<FileDbDto> selectFileDbList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}

