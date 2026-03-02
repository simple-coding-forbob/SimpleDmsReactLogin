package com.simplecoding.simpledmsreactlogin.meetingroom.controller;

import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.meetingroom.dto.MeetingRoomDto;
import com.simplecoding.simpledmsreactlogin.meetingroom.service.MeetingRoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MeetingRoomController {
    private final MeetingRoomService meetingRoomService;

    //	전체조회
    @Operation(summary = "미팅룸 전체 조회(페이징 없음)", description = "미팅룸 목록을 전체 조회합니다. 페이징 없습니다.")
    @GetMapping("/meeting-room/all")
    public ResponseEntity<ApiResponse<List<MeetingRoomDto>>> findAll() {
//		1) Pageable : page(현재페이지), size(1페이지 당 화면에 보일개수)
//		전체조회 서비스 메소드 실행
        List<MeetingRoomDto> list=meetingRoomService.findAll();
        ApiResponse<List<MeetingRoomDto>> response = new ApiResponse<>(true,
                "조회 성공", list, 0, 0);
        return ResponseEntity.ok(response);
    }

    //	전체조회
    @Operation(summary = "미팅룸 전체 조회", description = "검색 키워드로 미팅룸 목록을 조회합니다.")
    @GetMapping("/meeting-room")
    public ResponseEntity<ApiResponse<List<MeetingRoomDto>>> selectDeptList(@Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
                                                                            @PageableDefault(page = 0, size = 3) Pageable pageable) {
//		1) Pageable : page(현재페이지), size(1페이지 당 화면에 보일개수)
//		전체조회 서비스 메소드 실행
        Page<MeetingRoomDto> pages=meetingRoomService.selectMeetingRoomList(searchKeyword, pageable);
        log.info("테스트 : "+pages);
        ApiResponse<List<MeetingRoomDto>> response = new ApiResponse<>(true,
                "조회 성공", pages.getContent(), pages.getNumber(), pages.getTotalElements());
        return ResponseEntity.ok(response);
    }

    // 저장
    @Operation(summary = "미팅룸 저장", description = "새로운 미팅룸를 등록합니다.")
    @PostMapping("/meeting-room")
    public ResponseEntity<Void> create(@RequestBody MeetingRoomDto meetingRoomDto) {
        meetingRoomService.save(meetingRoomDto);
        return ResponseEntity.ok().build();
    }

    // 수정
    // mid는 사용하지 않더라도 넣는게 Restful 함
    @Operation(summary = "미팅룸 수정", description = "미팅룸를 수정합니다.")
    @PutMapping("/meeting-room/{mid}")
    public ResponseEntity<Void> update(
            @Parameter(description = "수정할 미팅룸 번호") @PathVariable long mid,
            @RequestBody MeetingRoomDto meetingRoomDto) {
        meetingRoomDto.setMid(mid);
        meetingRoomService.updateFromDto(meetingRoomDto);
        return ResponseEntity.ok().build();
    }

    // 상세조회
    @Operation(summary = "미팅룸 상세 조회", description = "미팅룸 번호로 상세 정보를 조회합니다.")
    @GetMapping("/meeting-room/{mid}")
    public ResponseEntity<ApiResponse<MeetingRoomDto>> findById(@Parameter(description = "조회할 미팅룸 번호") @PathVariable int mid) {
        MeetingRoomDto meetingRoomDto = meetingRoomService.findById(mid);

        ApiResponse<MeetingRoomDto> response = new ApiResponse<>(true, "조회 성공", meetingRoomDto, 0, 0);
        return ResponseEntity.ok(response);
    }

    // 삭제
    @Operation(summary = "미팅룸 삭제", description = "미팅룸 번호로 삭제합니다.")
    @DeleteMapping("/meeting-room/{mid}")
    public ResponseEntity<Void> delete(@Parameter(description = "삭제할 미팅룸 번호") @PathVariable int mid) {
        meetingRoomService.deleteById(mid);

        return ResponseEntity.ok().build();
    }
}
