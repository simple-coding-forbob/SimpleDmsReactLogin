package com.simplecoding.simpledmsreactlogin.booking.controller;

import com.simplecoding.simpledmsreactlogin.booking.dto.BookingDto;
import com.simplecoding.simpledmsreactlogin.booking.service.BookingService;
import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.dto.BookingStatusDto;
import com.simplecoding.simpledmsreactlogin.common.enums.BookingStatus;
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

import java.util.Arrays;
import java.util.List;


@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "BookingController", description = "예약 REST API")
public class BookingController {
    private final BookingService bookingService;
    private final CommonUtil commonUtil;

    // 전체 조회 + 페이징
    @Operation(summary = "BOOKING 전체 조회", description = "검색 키워드로 BOOKING 목록을 조회합니다.")
    @GetMapping("/booking")
    public ResponseEntity<ApiResponse<List<BookingDto>>> selectByBookingList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable
    ) {
        Page<BookingDto> pages = bookingService.selectByBookingList(searchKeyword, pageable);
        ApiResponse<List<BookingDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 단일 BOOKING 조회
    @Operation(summary = "BOOKING 상세 조회", description = "BOOKING 번호로 상세 정보를 조회합니다.")
    @GetMapping("/booking/{bid}")
    public ResponseEntity<ApiResponse<BookingDto>> selectById(
            @Parameter(description = "조회할 BOOKING 번호") @PathVariable long bid
    ) {
        BookingDto bookingDto = bookingService.selectById(bid);
        ApiResponse<BookingDto> response = new ApiResponse<>(true, "조회 성공", bookingDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 추가
    @Operation(summary = "BOOKING 등록", description = "새로운 BOOKING를 등록합니다.")
    @PostMapping("/booking")
    public ResponseEntity<Void> create( @Valid @RequestBody BookingDto bookingDto, BindingResult result) {
        commonUtil.checkBindingResult(result);
        bookingService.save(bookingDto);
        return ResponseEntity.ok().build();
    }

    // 상태 정보(예약 상수) 전체 조회: R(예약), C(취소), E(종료)
    @Operation(summary = "BOOKING 상태 정보 조회", description = "BOOKING 상태 정보를 조회합니다.")
    @GetMapping("/booking/status")
    public ResponseEntity<ApiResponse<List<BookingStatusDto>>> getStatusList() {

        List<BookingStatusDto> list = Arrays.stream(BookingStatus.values())
                .map(s -> new BookingStatusDto(s.name(), s.getDescription()))
                .toList();
        ApiResponse<List<BookingStatusDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                list,
                0,
                0
        );
        return ResponseEntity.ok(response);
    }

    // 수정
    @Operation(summary = "BOOKING 수정", description = "BOOKING를 수정합니다.")
    @PutMapping("/booking/{bid}")
    public ResponseEntity<Void> update(
            @PathVariable long bid,
            @Valid  @RequestBody BookingDto bookingDto, BindingResult result
    ) {
        commonUtil.checkBindingResult(result);
        bookingDto.setBid(bid); // bid를 DTO에 설정
        bookingService.updateFromDto(bookingDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "BOOKING 삭제", description = "BOOKING 번호로 삭제합니다.")
    @DeleteMapping("/booking/{bid}")
    public ResponseEntity<Void> delete(@PathVariable long bid) {
        bookingService.deleteById(bid);
        return ResponseEntity.ok().build();
    }
}
