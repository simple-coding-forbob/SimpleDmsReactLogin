package com.simplecoding.simpledmsreactlogin.emp.controller;

import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.emp.dto.EmpDto;
import com.simplecoding.simpledmsreactlogin.emp.service.EmpService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@Tag(name = "EmpController", description = "사원 API 문서")
@RequestMapping("/api")
public class EmpController {

	private final EmpService empService;
    private final CommonUtil commonUtil;

	// 전체 조회
	@Operation(summary = "사원 전체 조회", description = "검색 키워드로 사원 목록을 조회합니다.")
	@GetMapping("/emp")
	public ResponseEntity<ApiResponse<List<EmpDto>>> selectEmpList(
			@Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
			@PageableDefault(page = 0, size = 3) Pageable pageable) {

		Page<EmpDto> pages = empService.selectEmpList(searchKeyword, pageable);
		ApiResponse<List<EmpDto>> response = new ApiResponse<>(
				true,
				"조회 성공",
				pages.getContent(),
				pages.getNumber(),
				pages.getTotalElements()
		);

		return ResponseEntity.ok(response);
	}

	// 저장
	@Operation(summary = "사원 저장", description = "새로운 사원을 등록합니다.")
	@PostMapping("/emp")
	public ResponseEntity<Void> create(@Valid @RequestBody EmpDto empDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
		empService.save(empDto);
		return ResponseEntity.ok().build();
	}

	// 수정
	@Operation(summary = "사원 수정", description = "사원을 수정합니다.")
	@PutMapping("/emp/{eno}")
	public ResponseEntity<Void> update(
			@Parameter(description = "수정할 사원 번호") @PathVariable long eno,
            @Valid @RequestBody EmpDto empDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        empDto.setEno(eno);
		empService.updateFromDto(empDto);
		return ResponseEntity.ok().build();
	}

	// 상세조회
	@Operation(summary = "사원 상세 조회", description = "사원 번호로 상세 정보를 조회합니다.")
	@GetMapping("/emp/{eno}")
	public ResponseEntity<ApiResponse<EmpDto>> findById(
			@Parameter(description = "조회할 사원 번호") @PathVariable long eno) {

		EmpDto empDto = empService.findById(eno);
		ApiResponse<EmpDto> response = new ApiResponse<>(true, "조회 성공", empDto, 0, 0);
		return ResponseEntity.ok(response);
	}

	// 삭제
	@Operation(summary = "사원 삭제", description = "사원 번호로 삭제합니다.")
	@DeleteMapping("/emp/{eno}")
	public ResponseEntity<Void> delete(@PathVariable long eno) {
		empService.deleteById(eno);

		return ResponseEntity.ok().build();
	}
}
