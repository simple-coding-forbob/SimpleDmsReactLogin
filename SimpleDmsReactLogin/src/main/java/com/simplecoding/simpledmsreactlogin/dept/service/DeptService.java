package com.simplecoding.simpledmsreactlogin.dept.service;




import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;
import com.simplecoding.simpledmsreactlogin.dept.dto.DeptDto;
import com.simplecoding.simpledmsreactlogin.dept.entity.Dept;
import com.simplecoding.simpledmsreactlogin.dept.repository.DeptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DeptService {

    //    DB CRUD 클래스 받기 : JPA 제공 함수 사용 가능
    private final DeptRepository deptRepository;
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;

    public Page<DeptDto> selectDeptList(String searchKeyword, Pageable pageable) {
        return deptRepository.selectDeptList(searchKeyword, pageable);
    }

    //    저장/수정 : 1) 기본키가(부서번호) 없으면 저장(insert)
//               2) 기본키가(부서번호) 있으면 수정(update)
//           => JPA 내부적으로 if문 있음 : 알아서 실행됨
    public void save(DeptDto deptDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        Dept dept=mapStruct.toEntity(deptDto);
        deptRepository.save(dept);
    }

    public DeptDto findById(long dno) {
//        JPA 상세조회 함수 실행
        Dept dept = deptRepository.findById(dno)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));

        return mapStruct.toDto(dept);
    }

    @Transactional
    public void updateFromDto(DeptDto deptDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        Dept dept=deptRepository.findById(deptDto.getDno())
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));

        mapStruct.updateFromDto(deptDto, dept);
//        deptRepository.save(dept);     // dirty checking 으로 인해 필요없음
    }

    //    삭제 함수
    public void deleteById(long dno) {
        deptRepository.deleteById(dno);
    }
}

