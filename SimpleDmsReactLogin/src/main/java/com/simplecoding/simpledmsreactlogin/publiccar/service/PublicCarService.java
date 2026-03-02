package com.simplecoding.simpledmsreactlogin.publiccar.service;

import com.simplecoding.simpledmsreactlogin.common.CommonUtil;
import com.simplecoding.simpledmsreactlogin.common.MapStruct;

import com.simplecoding.simpledmsreactlogin.publiccar.dto.PublicCarDto;
import com.simplecoding.simpledmsreactlogin.publiccar.entity.PublicCar;
import com.simplecoding.simpledmsreactlogin.publiccar.repository.PublicCarRepository;
import io.swagger.v3.oas.annotations.servers.Server;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PublicCarService {
    private final PublicCarRepository publicCarRepository;
    private final MapStruct mapStruct;
    private final CommonUtil commonUtil;
    
    //    TODO: select 박스 태그에서 사용: 전체조회
    public List<PublicCarDto> findAll() {
        List<PublicCar> list= publicCarRepository.findAll();
        return list.stream()
                .map(data -> mapStruct.toDto(data))
                .collect(Collectors.toList());
    }

    public Page<PublicCarDto> selectPublicCarList(String searchKeyword, Pageable pageable) {
        Page<PublicCarDto> page= publicCarRepository.selectPublicCarList(searchKeyword, pageable);
        return page;
    }

    //    저장/수정 : 1) 기본키가(부서번호) 없으면 저장(insert)
//               2) 기본키가(부서번호) 있으면 수정(update)
//           => JPA 내부적으로 if문 있음 : 알아서 실행됨
    public void save(PublicCarDto publicCarDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        PublicCar publicCar=mapStruct.toEntity(publicCarDto);
        publicCarRepository.save(publicCar);
    }

    public PublicCarDto findById(long pid) {
//        JPA 상세조회 함수 실행
        PublicCar publicCar = publicCarRepository.findById(pid)
                .orElseThrow(() -> new RuntimeException(commonUtil.getMessage("errors.not.found")));

        return mapStruct.toDto(publicCar);
    }

    @Transactional
    public void updateFromDto(PublicCarDto publicCarDto) {
//        JPA 저장 함수 실행 : return 값 : 저장된 객체
        PublicCar publicCar=publicCarRepository.findById(publicCarDto.getPid())
                .orElseThrow(() -> new RuntimeException("정보를 찾을 수 없습니다."));

        mapStruct.updateFromDto(publicCarDto, publicCar);
//        publicCarRepository.save(publicCar);     // dirty checking 으로 인해 필요없음
    }

    //    삭제 함수
    public void deleteById(long pid) {
        publicCarRepository.deleteById(pid);
    }
}
