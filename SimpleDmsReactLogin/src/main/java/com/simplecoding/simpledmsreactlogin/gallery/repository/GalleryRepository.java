package com.simplecoding.simpledmsreactlogin.gallery.repository;


import com.simplecoding.simpledmsreactlogin.gallery.dto.GalleryDto;
import com.simplecoding.simpledmsreactlogin.gallery.entity.Gallery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, String> {
    @Query(value = "select new com.simplecoding.simpledmsreactlogin.gallery.dto" +
            ".GalleryDto(g.uuid,g.galleryTitle,g.galleryFileUrl) " +
            "from Gallery g\n" +
            "where g.galleryTitle like %:searchKeyword% order by g.insertTime desc")
    Page<GalleryDto> selectGalleryList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
