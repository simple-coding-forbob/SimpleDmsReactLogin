package com.simplecoding.simpledmsreactlogin.reservation.controller;

import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.reservation.dto.ReservationDto;
import com.simplecoding.simpledmsreactlogin.reservation.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "ReservationController", description = "예약 REST API")
public class ReservationController {
    private final ReservationService reservationService;

    // 전체 조회 + 페이징
    @Operation(summary = "RESERVATION 전체 조회", description = "검색 키워드로 RESERVATION 목록을 조회합니다.")
    @GetMapping("/reservation")
    public ResponseEntity<ApiResponse<List<ReservationDto>>> selectByReservationList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable
    ) {
        Page<ReservationDto> pages = reservationService.selectByReservationList(searchKeyword, pageable);
        ApiResponse<List<ReservationDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 단일 RESERVATION 조회
    @Operation(summary = "RESERVATION 상세 조회", description = "RESERVATION 번호로 상세 정보를 조회합니다.")
    @GetMapping("/reservation/{rid}")
    public ResponseEntity<ApiResponse<ReservationDto>> selectById(
            @Parameter(description = "조회할 RESERVATION 번호") @PathVariable long rid
    ) {
        ReservationDto reservationDto = reservationService.selectById(rid);
        ApiResponse<ReservationDto> response = new ApiResponse<>(true, "조회 성공", reservationDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 추가
    @Operation(summary = "RESERVATION 등록", description = "새로운 RESERVATION를 등록합니다.")
    @PostMapping("/reservation")
    public ResponseEntity<Void> create(@RequestBody ReservationDto reservationDto) {
        reservationService.save(reservationDto);
        return ResponseEntity.ok().build();
    }

    // 수정
    @Operation(summary = "RESERVATION 수정", description = "RESERVATION를 수정합니다.")
    @PutMapping("/reservation/{rid}")
    public ResponseEntity<Void> update(
            @PathVariable long rid,
            @RequestBody ReservationDto reservationDto
    ) {
        reservationDto.setRid(rid); // rid를 DTO에 설정
        reservationService.updateFromDto(reservationDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "RESERVATION 삭제", description = "RESERVATION 번호로 삭제합니다.")
    @DeleteMapping("/reservation/{rid}")
    public ResponseEntity<Void> delete(@PathVariable long rid) {
        reservationService.deleteById(rid);
        return ResponseEntity.ok().build();
    }
}
