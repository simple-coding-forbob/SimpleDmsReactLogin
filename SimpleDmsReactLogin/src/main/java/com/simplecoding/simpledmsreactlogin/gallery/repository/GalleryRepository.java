package com.simplecoding.simpledmsreactlogin.gallery.repository;


import com.simplecoding.simpledmsreactlogin.gallery.entity.Gallery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, String> {
    @Query(value = "select g from Gallery g\n" +
            "where g.galleryTitle like %:searchKeyword%")
    Page<Gallery> selectGalleryList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
