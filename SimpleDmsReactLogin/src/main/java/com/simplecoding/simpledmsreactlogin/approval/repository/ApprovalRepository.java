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
            "a.aid, a.document.docId, a.document.title, a.emp.eno, a.seq, a.status, a.approveTime, a.note) " +
            "from Approval a " +
            "where a.document.title like %:searchKeyword% " +
            "and a.document.emp.eno=:drafter " +
            "and a.status='P' " +
            "order by a.document.docId, a.seq ")
    Page<ApprovalDto> selectApprovalDrafts(@Param("searchKeyword") String searchKeyword,
                                         @Param("drafter") Long drafter, Pageable pageable);

    @Query("select new com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto(" +
            "a.aid, a.document.docId, a.document.title, a.emp.eno, a.seq, a.status, a.approveTime, a.note) " +
            "from Approval a " +
            "where a.document.title like %:searchKeyword% " +
            "and a.emp.eno=:approver " +
            "and a.status='P' " +
            "order by a.document.docId, a.seq ")
    Page<ApprovalDto> selectApprovalPending(@Param("searchKeyword") String searchKeyword,
                                            @Param("approver") Long approver, Pageable pageable);

    @Query("select new com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto(" +
            "a.aid, a.document.docId, a.document.title, a.emp.eno, a.seq, a.status, a.approveTime, a.note) " +
            "from Approval a " +
            "where a.document.title like %:searchKeyword% " +
            "and a.emp.eno=:approver " +
            "and a.status='A' " +
            "order by a.document.docId, a.seq ")
    Page<ApprovalDto> selectApprovalCompleted(@Param("searchKeyword") String searchKeyword,
                                            @Param("approver") Long approver, Pageable pageable);
}
