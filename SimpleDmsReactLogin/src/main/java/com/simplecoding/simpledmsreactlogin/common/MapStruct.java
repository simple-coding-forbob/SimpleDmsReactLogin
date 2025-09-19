package com.simplecoding.simpledmsreactlogin.common;


import com.simplecoding.simpledmsreactlogin.auth.dto.MemberDto;
import com.simplecoding.simpledmsreactlogin.auth.dto.MypageDto;
import com.simplecoding.simpledmsreactlogin.auth.entity.Member;
import com.simplecoding.simpledmsreactlogin.dept.dto.DeptDto;
import com.simplecoding.simpledmsreactlogin.dept.entity.Dept;
import com.simplecoding.simpledmsreactlogin.emp.dto.EmpDto;
import com.simplecoding.simpledmsreactlogin.emp.entity.Emp;
import com.simplecoding.simpledmsreactlogin.eventnotice.dto.EventNoticeDto;
import com.simplecoding.simpledmsreactlogin.eventnotice.entity.EventNotice;
import com.simplecoding.simpledmsreactlogin.faq.dto.FaqDto;
import com.simplecoding.simpledmsreactlogin.faq.entity.Faq;
import com.simplecoding.simpledmsreactlogin.filedb.dto.FileDbDto;
import com.simplecoding.simpledmsreactlogin.filedb.entity.FileDb;
import com.simplecoding.simpledmsreactlogin.freeboard.dto.FreeBoardDto;
import com.simplecoding.simpledmsreactlogin.freeboard.entity.FreeBoard;
import com.simplecoding.simpledmsreactlogin.gallery.dto.GalleryDto;
import com.simplecoding.simpledmsreactlogin.gallery.entity.Gallery;
import com.simplecoding.simpledmsreactlogin.notice.dto.NoticeDto;
import com.simplecoding.simpledmsreactlogin.notice.entity.Notice;
import com.simplecoding.simpledmsreactlogin.qna.dto.QnaDto;
import com.simplecoding.simpledmsreactlogin.qna.entity.Qna;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;


@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE  // null 제외 기능(update 시 사용)
)
public interface MapStruct {

    // TODO: 1) Dept <-> DeptDto
    DeptDto toDto(Dept dept);
    Dept toEntity(DeptDto deptDto);
    // TODO: 수정 시 사용: dirty checking 기능(save() 없이 수정 가능)
    void updateFromDto(DeptDto deptDto, @MappingTarget Dept dept);

    // TODO: 2) Emp <-> EmpDto
    @Mapping(source = "dept.dno", target = "dno")
    EmpDto toDto(Emp emp);
    @Mapping(source = "dno", target = "dept.dno")
    Emp toEntity(EmpDto empDto);
    // TODO: 수정 시 사용: dirty checking 기능(save() 없이 수정 가능)
//      경고 무시하고 싶으면 아래 추가하세요
    @Mapping(target = "dept", ignore = true)
    void updateFromDto(EmpDto empDto, @MappingTarget Emp emp);

    // TODO: 3) Faq <-> FaqDto
    FaqDto toDto(Faq faq);
    Faq toEntity(FaqDto faqDto);
    // TODO: 수정 시 사용: dirty checking 기능(save() 없이 수정 가능)
    void updateFromDto(FaqDto faqDto, @MappingTarget Faq faq);

    // TODO: 4) Qna <-> QnaDto
    QnaDto toDto(Qna qna);
    Qna toEntity(QnaDto qnaDto);
    // TODO: 수정 시 사용: dirty checking 기능(save() 없이 수정 가능)
    void updateFromDto(QnaDto qnaDto, @MappingTarget Qna qna);

    // TODO: 5) Notice <-> NoticeDto
    NoticeDto toDto(Notice notice);
    Notice toEntity(NoticeDto noticeDto);
    // TODO: 수정 시 사용: dirty checking 기능(save() 없이 수정 가능)
    void updateFromDto(NoticeDto noticeDto, @MappingTarget Notice notice);

    // TODO: 6) EventNotice <-> EventNoticeDto
    EventNoticeDto toDto(EventNotice eventNotice);
    EventNotice toEntity(EventNoticeDto eventNoticeDto);
    // TODO: 수정 시 사용: dirty checking 기능(save() 없이 수정 가능)
    void updateFromDto(EventNoticeDto eventNoticeDto, @MappingTarget EventNotice eventNotice);

    //    TODO: 7) fileDb <-> fileDto
    FileDbDto toDto(FileDb fileDb);
    @Mapping(target = "fileData", ignore = true)
    FileDb toEntity(FileDbDto fileDbDto);

    //    TODO: 8) gallery <-> galleryDto
    GalleryDto toDto(Gallery gallery);
    @Mapping(target = "galleryData", ignore = true)
    Gallery toEntity(GalleryDto galleryDto);

    //    TODO: 9) member <-> memberDto
    MemberDto toDto(Member member);
    Member toEntity(MemberDto memberDto);

    //    TODO: 10) Member <-> MypageDto
    MypageDto toDto2(Member member);
    Member toEntity2(MypageDto mypageDto);

    // TODO: 11) FreeBoard <-> FreeBoardDto
    @Mapping(source = "member.email", target = "email")
    @Mapping(source = "member.name", target = "name")
    FreeBoardDto toDto(FreeBoard freeBoard);
    @Mapping(source = "email", target = "member.email")
    @Mapping(source = "name", target = "member.name")
    FreeBoard toEntity(FreeBoardDto freeBoardDto);
    // TODO: 수정 시 사용: dirty checking 기능(save() 없이 수정 가능)
    void updateFromDto(FreeBoardDto freeBoardDto, @MappingTarget FreeBoard freeBoard);
}
