package com.simplecoding.simpledmsreactlogin.approval.repository;

import com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto;
import com.simplecoding.simpledmsreactlogin.approval.entity.Approval;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ApprovalRepository extends JpaRepository<Approval, Long> {

    @Query("select new com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto(" +
            "a.aid, a.document.uuid, a.emp.eno, a.seq, a.status, a.approveTime, a.note) " +
            "from Approval a " +
            "where a.document.title like %:searchKeyword% " +
            "order by a.insertTime desc")
    Page<ApprovalDto> selectApprovalList(@Param("searchKeyword") String searchKeyword, Pageable pageable);
}
