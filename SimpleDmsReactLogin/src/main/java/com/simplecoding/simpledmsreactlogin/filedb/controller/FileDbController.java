package com.simplecoding.simpledmsreactlogin.filedb.controller;


import com.simplecoding.simpledmsreactlogin.common.ApiResponse;
import com.simplecoding.simpledmsreactlogin.filedb.dto.FileDbDto;
import com.simplecoding.simpledmsreactlogin.filedb.entity.FileDb;
import com.simplecoding.simpledmsreactlogin.filedb.service.FileDbService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@Tag(name = "FileDbController", description = "FileDb REST API")
@RequestMapping("/api") // 공통 URL
public class FileDbController {

    private final FileDbService fileDbService;

    // 전체 조회 + 페이징
    @Operation(summary = "FileDb 전체 조회", description = "검색 키워드로 FileDb 목록을 조회합니다.")
        @GetMapping("/fileDb")
    public ResponseEntity<ApiResponse<List<FileDbDto>>> selectFileDbList(
            @Parameter(description = "검색 키워드") @RequestParam(defaultValue = "") String searchKeyword,
            @PageableDefault(page = 0, size = 3) Pageable pageable
    ) {
        Page<FileDbDto> pages = fileDbService.selectFileDbList(searchKeyword, pageable);
        ApiResponse<List<FileDbDto>> response = new ApiResponse<>(
                true,
                "조회 성공",
                pages.getContent(),
                pages.getNumber(),
                pages.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    // 추가 (CUD는 Void)
    @Operation(summary = "FileDb 등록", description = "새로운 FileDb를 등록합니다.")
    @PostMapping("/fileDb")
    public ResponseEntity<Void> create(
            @RequestParam(defaultValue = "") String fileTitle,
            @RequestParam(defaultValue = "") String fileContent,
            @RequestParam(required = false) MultipartFile fileData
    ) throws Exception {
        FileDbDto fileDbDto = new FileDbDto(fileTitle, fileContent);
        fileDbService.save(fileDbDto, fileData.getBytes());
        return ResponseEntity.ok().build();
    }

    // 삭제
    @Operation(summary = "FileDb 삭제", description = "UUID로 삭제합니다.")
    @DeleteMapping("/fileDb/{uuid}")
    public ResponseEntity<Void> delete(@PathVariable String uuid) {
        fileDbService.deleteById(uuid);
        return ResponseEntity.ok().build();
    }

    // 다운로드
    @Operation(summary = "FileDb 다운로드", description = "UUID로 첨부파일을 다운로드합니다.")
    @GetMapping("/fileDb/download/{uuid}")
    public ResponseEntity<byte[]> fileDownload(@PathVariable String uuid) {
        FileDb fileDb = fileDbService.findById(uuid);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", fileDb.getUuid());
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        return new ResponseEntity<>(fileDb.getFileData(), headers, HttpStatus.OK);
    }
}
