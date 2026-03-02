package com.simplecoding.simpledmsreactlogin.common;


import com.simplecoding.simpledmsreactlogin.approval.dto.ApprovalDto;
import com.simplecoding.simpledmsreactlogin.approval.entity.Approval;
import com.simplecoding.simpledmsreactlogin.auth.dto.MemberDto;
import com.simplecoding.simpledmsreactlogin.auth.dto.MypageDto;
import com.simplecoding.simpledmsreactlogin.auth.entity.Member;
import com.simplecoding.simpledmsreactlogin.booking.dto.BookingDto;
import com.simplecoding.simpledmsreactlogin.booking.entity.Booking;
import com.simplecoding.simpledmsreactlogin.common.dto.PdfDto;
import com.simplecoding.simpledmsreactlogin.dept.dto.DeptDto;
import com.simplecoding.simpledmsreactlogin.dept.entity.Dept;
import com.simplecoding.simpledmsreactlogin.document.dto.DocumentDto;
import com.simplecoding.simpledmsreactlogin.document.entity.Document;
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
import com.simplecoding.simpledmsreactlogin.meetingroom.dto.MeetingRoomDto;
import com.simplecoding.simpledmsreactlogin.meetingroom.entity.MeetingRoom;
import com.simplecoding.simpledmsreactlogin.newsboard.dto.NewsBoardDto;
import com.simplecoding.simpledmsreactlogin.newsboard.entity.NewsBoard;
import com.simplecoding.simpledmsreactlogin.notice.dto.NoticeDto;
import com.simplecoding.simpledmsreactlogin.notice.entity.Notice;
import com.simplecoding.simpledmsreactlogin.publiccar.dto.PublicCarDto;
import com.simplecoding.simpledmsreactlogin.publiccar.entity.PublicCar;
import com.simplecoding.simpledmsreactlogin.qna.dto.QnaDto;
import com.simplecoding.simpledmsreactlogin.qna.entity.Qna;
import com.simplecoding.simpledmsreactlogin.reservation.dto.ReservationDto;
import com.simplecoding.simpledmsreactlogin.reservation.entity.Reservation;
import com.simplecoding.simpledmsreactlogin.template.dto.TemplateDto;
import com.simplecoding.simpledmsreactlogin.template.entity.Template;
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
    void updateFromDto(FaqDto faqDto, @MappingTarget Faq faq);

    // TODO: 4) Qna <-> QnaDto
    QnaDto toDto(Qna qna);
    Qna toEntity(QnaDto qnaDto);
    void updateFromDto(QnaDto qnaDto, @MappingTarget Qna qna);

    // TODO: 5) Notice <-> NoticeDto
    NoticeDto toDto(Notice notice);
    Notice toEntity(NoticeDto noticeDto);
    void updateFromDto(NoticeDto noticeDto, @MappingTarget Notice notice);

    // TODO: 6) EventNotice <-> EventNoticeDto
    EventNoticeDto toDto(EventNotice eventNotice);
    EventNotice toEntity(EventNoticeDto eventNoticeDto);
    void updateFromDto(EventNoticeDto eventNoticeDto, @MappingTarget EventNotice eventNotice);

    //    TODO: 7) fileDb <-> fileDto
    FileDbDto toDto(FileDb fileDb);
    FileDb toEntity(FileDbDto fileDbDto);

    //    TODO: 8) gallery <-> galleryDto
    GalleryDto toDto(Gallery gallery);
    Gallery toEntity(GalleryDto galleryDto);

    //    TODO: 9) member <-> memberDto
    @Mapping(source = "emp.eno", target = "eno")
    MemberDto toDto(Member member);
    @Mapping(source = "eno", target = "emp.eno")
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
    void updateFromDto(FreeBoardDto freeBoardDto, @MappingTarget FreeBoard freeBoard);

    // TODO: 12) NewsBoard <-> NewsBoardDto
    @Mapping(source = "member.email", target = "email")
    @Mapping(source = "member.name", target = "name")
    NewsBoardDto toDto(NewsBoard newsBoard);
    @Mapping(source = "email", target = "member.email")
    @Mapping(source = "name", target = "member.name")
    NewsBoard toEntity(NewsBoardDto newsBoardDto);
    void updateFromDto(NewsBoardDto newsBoardDto, @MappingTarget NewsBoard newsBoard);

    // TODO: 13) MeetingRoom <-> MeetingRoomDto
    MeetingRoomDto toDto(MeetingRoom meetingRoom);
    MeetingRoom toEntity(MeetingRoomDto meetingRoomDto);
    void updateFromDto(MeetingRoomDto meetingRoomDto, @MappingTarget MeetingRoom meetingRoom);

    // TODO: 14) Reservation <-> ReservationDto
    @Mapping(source = "member.email", target = "email")
    @Mapping(source = "meetingRoom.mid", target = "mid")
    @Mapping(source = "meetingRoom.roomName", target = "roomName")
    ReservationDto toDto(Reservation reservation);
    @Mapping(source = "email", target = "member.email")
    @Mapping(source = "mid", target = "meetingRoom.mid")
    Reservation toEntity(ReservationDto reservationDto);
    void updateFromDto(ReservationDto reservationDto, @MappingTarget Reservation reservation);

    // TODO: 15) PublicCar <-> PublicCarDto
    PublicCarDto toDto(PublicCar publicCar);
    PublicCar toEntity(PublicCarDto publicCarDto);
    void updateFromDto(PublicCarDto publicCarDto, @MappingTarget PublicCar publicCar);

    // TODO: 16) Booking <-> BookingDto
    @Mapping(source = "member.email", target = "email")
    @Mapping(source = "publicCar.pid", target = "pid")
    @Mapping(source = "publicCar.carName", target = "carName")
    BookingDto toDto(Booking booking);
    @Mapping(source = "email", target = "member.email")
    @Mapping(source = "pid", target = "publicCar.pid")
    Booking toEntity(BookingDto bookingDto);
    void updateFromDto(BookingDto bookingDto, @MappingTarget Booking booking);

    // TODO: 17) Template <-> TemplateDto
    TemplateDto toDto(Template template);
    Template toEntity(TemplateDto templateDto);

    // TODO: 18) Document <-> DocumentDto
    @Mapping(source = "emp.eno", target = "drafter")
    @Mapping(source = "template.tid", target = "tid")
    DocumentDto toDto(Document document);
    @Mapping(source = "drafter", target = "emp.eno")
    @Mapping(source = "tid", target = "template.tid")
    Document toEntity(DocumentDto documentDto);
    void updateFromDto(DocumentDto documentDto, @MappingTarget Document document);

    // TODO: 19) Document -> PdfDto
    @Mapping(source = "emp.dept.dname", target = "dname")
    @Mapping(source = "emp.job", target = "job")
    @Mapping(source = "emp.ename", target = "ename")
    @Mapping(source = "emp.eno", target = "drafter")
    @Mapping(source = "template.fileName", target = "fileName")
    PdfDto toPdfDto(Document document);

    // TODO: 20) Approval <-> ApprovalDto
    @Mapping(source = "document.docId", target = "docId")
    @Mapping(source = "emp.eno", target = "approver")
    ApprovalDto toDto(Approval approval);
    @Mapping(source = "docId", target = "document.docId")
    @Mapping(source = "approver", target = "emp.eno")
    Approval toEntity(ApprovalDto approvalDto);
    void updateFromDto(ApprovalDto approvalDto,@MappingTarget Approval approval);
}
