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

    @Query("select count(a) " +
            "from Approval a " +
            "where a.document.docId=:docId " +
            "and a.status='P'")
    long countAlreadyApproval(@Param("docId") Long docId);

    //    내가 기안을 올린 문서: 상태추적 가능
    @Query("select new com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto(" +
            "a.aid, a.document.docId, a.document.title, a.document.emp.eno,a.emp.eno, a.seq, a.status, a.approveTime, a.note) " +
            "from Approval a " +
            "where a.document.title like %:searchKeyword% " +
            "and a.document.emp.eno=:drafter " +
            "order by a.document.docId, a.seq ")
    Page<ApprovalDto> selectApprovalDrafts(@Param("searchKeyword") String searchKeyword,
                                           @Param("drafter") Long drafter, Pageable pageable);

    //    내가 결재할 문서: 앞 결재자가 결재한 문서만 조회하기
    @Query("select new com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto(" +
            "a.aid, a.document.docId, a.document.title, a.document.emp.eno, a.emp.eno, a.seq, a.status, a.approveTime, a.note) " +
            "from Approval a " +
            "where a.document.title like %:searchKeyword% " +
            "and a.emp.eno = :approver " +
            "and a.status = 'P' " +
            "and (a.seq=1 or exists (" +
            "    select 1 from Approval prev " +
            "    where prev.document = a.document " +
            "      and prev.seq = a.seq - 1 " +   // 바로 이전 순번만 체크
            "      and prev.status = 'A'" +       // 결재 완료
            ")) " +
            "order by a.document.docId, a.seq")
    Page<ApprovalDto> selectApprovalPending(@Param("searchKeyword") String searchKeyword,
                                            @Param("approver") Long approver, Pageable pageable);

    //    내가 이미 결재한 문서
    @Query("select new com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto(" +
            "a.aid, a.document.docId, a.document.title, a.document.emp.eno, a.emp.eno, a.seq, a.status, a.approveTime, a.note) " +
            "from Approval a " +
            "where a.document.title like %:searchKeyword% " +
            "and a.emp.eno=:approver " +
            "and a.status='A' " +
            "order by a.document.docId, a.seq ")
    Page<ApprovalDto> selectApprovalCompleted(@Param("searchKeyword") String searchKeyword,
                                              @Param("approver") Long approver, Pageable pageable);
}
