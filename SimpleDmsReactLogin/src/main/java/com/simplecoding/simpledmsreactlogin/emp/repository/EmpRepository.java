package com.simplecoding.simpledmsreactlogin.emp.repository;


import com.simplecoding.simpledmsreactlogin.emp.dto.EmpDto;
import com.simplecoding.simpledmsreactlogin.emp.entity.Emp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpRepository extends JpaRepository<Emp,Long> {
    @Query(value = "select new com.simplecoding.simpledmsreactlogin.emp.dto" +
            ".EmpDto(e.eno,e.ename,e.job,e.manager,e.hiredate,e.salary,e.commission,e.dept.dno) " +
            "from Emp e\n" +
            "where e.ename like %:searchKeyword% order by e.insertTime desc")
    Page<EmpDto> selectEmpList(
            @Param("searchKeyword") String searchKeyword,
            Pageable pageable
    );
}
