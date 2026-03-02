import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

// 메뉴 등록 시 2가지 중에 1가지를 사용하세요
// 일반 로딩 사용법: import 페이지명 from "페이지경로";
// lazy 로딩 사용법: const 상수 = lazy(() => import("페이지경로"));

// 공통 로딩 컴포넌트
const loading = <div>Loading...</div>;

// 페이지 lazy 로딩
const Home = lazy(() => import("../pages/Home"));

// 부서
const DeptList = lazy(() => import("../pages/dept/DeptList"));
const AddDept = lazy(() => import("../pages/dept/AddDept"));
const DeptDetail = lazy(() => import("../pages/dept/DeptDetail"));

// 사원
const EmpList = lazy(() => import("../pages/emp/EmpList"));
const AddEmp = lazy(() => import("../pages/emp/AddEmp"));
const EmpDetail = lazy(() => import("../pages/emp/EmpDetail"));

const FaqList = lazy(() => import("../pages/faq/FaqList"));
const AddFaq = lazy(() => import("../pages/faq/AddFaq"));
const FaqDetail = lazy(() => import("../pages/faq/FaqDetail"));
// QnA
const QnaList = lazy(() => import("../pages/qna/QnaList"));
const AddQna = lazy(() => import("../pages/qna/AddQna"));
const QnaDetail = lazy(() => import("../pages/qna/QnaDetail"));

// 공지사항
const NoticeList = lazy(() => import("../pages/notice/NoticeList"));
const AddNotice = lazy(() => import("../pages/notice/AddNotice"));
const NoticeDetail = lazy(() => import("../pages/notice/NoticeDetail"));

// 이벤트 공지사항
const EventNoticeList = lazy(() => import("../pages/eventnotice/EventNoticeList"));
const AddEventNotice = lazy(() => import("../pages/eventnotice/AddEventNotice"));
const EventNoticeDetail = lazy(() => import("../pages/eventnotice/EventNoticeDetail"));

// 파일 DB
const FileDbList = lazy(() => import("../pages/filedb/FileDbList"));
const AddFileDb = lazy(() => import("../pages/filedb/AddFileDb"));

// 갤러리
const GalleryList = lazy(() => import("../pages/gallery/GalleryList"));
const AddGallery = lazy(() => import("../pages/gallery/AddGallery"));

// 회원/로그인
const LoginView = lazy(() => import("../pages/auth/LoginView"));
const RegisterView = lazy(() => import("../pages/auth/RegisterView"));
const Mypage = lazy(() => import("../pages/Mypage"));

// 자유게시판
const FreeBoardList = lazy(() => import("../pages/freeboard/FreeBoardList"));
const AddFreeBoard = lazy(() => import("../pages/freeboard/AddFreeBoard"));
const FreeBoardDetail = lazy(
  () => import("../pages/freeboard/FreeBoardDetail")
);

// 뉴스게시판
const NewsBoardList = lazy(() => import("../pages/newsboard/NewsBoardList"));
const AddNewsBoard = lazy(() => import("../pages/newsboard/AddNewsBoard"));
const NewsBoardDetail = lazy(
  () => import("../pages/newsboard/NewsBoardDetail")
);

// 예약 게시판
const MeetingRoomList = lazy(() => import("../pages/meetingroom/MeetingRoomList"));
const AddMeetingRoom = lazy(() => import("../pages/meetingroom/AddMeetingRoom"));
const MeetingRoomDetail = lazy(() => import("../pages/meetingroom/MeetingRoomDetail"));

// 예약 게시판
const ReservationList = lazy(
  () => import("../pages/reservation/ReservationList")
);
const AddReservation = lazy(
  () => import("../pages/reservation/AddReservation")
);
const ReservationDetail = lazy(
  () => import("../pages/reservation/ReservationDetail")
);

// 공용차량
const PublicCarList = lazy(() => import("../pages/publiccar/PublicCarList"));
const AddPublicCar = lazy(() => import("../pages/publiccar/AddPublicCar"));
const PublicCarDetail = lazy(() => import("../pages/publiccar/PublicCarDetail"));

// 예약 차량
const BookingList = lazy(() => import("../pages/booking/BookingList"));
const AddBooking = lazy(() => import("../pages/booking/AddBooking"));
const BookingDetail = lazy(() => import("../pages/booking/BookingDetail"));

// 전자결재: 템플릿
const TemplateList = lazy(() => import("../pages/template/TemplateList"));
const AddTemplate = lazy(() => import("../pages/template/AddTemplate"));

// 전자결재: 문서
const DocumentList = lazy(() => import("../pages/document/DocumentList"));
const AddDocument = lazy(() => import("../pages/document/AddDocument"));

// 전자결재: 결재
const ApprovalDrafts = lazy(() => import("../pages/approval/ApprovalDrafts"));
const ApprovalPending = lazy(() => import("../pages/approval/ApprovalPending"));
const ApprovalCompleted = lazy(
  () => import("../pages/approval/ApprovalCompleted")
);
const AddApproval = lazy(() => import("../pages/approval/AddApproval"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={loading}>
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      // 부서
      { path: "dept", element: <DeptList /> },
      { path: "add-dept", element: <AddDept /> },
      { path: "dept-detail/:dno", element: <DeptDetail /> },
      // 사원
      { path: "emp", element: <EmpList /> },
      { path: "add-emp", element: <AddEmp /> },
      { path: "emp-detail/:eno", element: <EmpDetail /> },
      // faq
      { path: "faq", element: <FaqList /> },
      { path: "add-faq", element: <AddFaq /> },
      { path: "faq-detail/:fno", element: <FaqDetail /> },
      // qna
      { path: "qna", element: <QnaList /> },
      { path: "add-qna", element: <AddQna /> },
      { path: "qna-detail/:qno", element: <QnaDetail /> },
      // 공지사항
      { path: "notice", element: <NoticeList /> },
      { path: "add-notice", element: <AddNotice /> },
      { path: "notice-detail/:nid", element: <NoticeDetail /> },
      // 이벤트 공지사항
      { path: "event-notice", element: <EventNoticeList /> },
      { path: "add-event-notice", element: <AddEventNotice /> },
      { path: "event-notice-detail/:eid", element: <EventNoticeDetail /> },
      // 파일db 업로드
      { path: "fileDb", element: <FileDbList /> },
      { path: "add-fileDb", element: <AddFileDb /> },
      // 갤러리 업로드
      { path: "gallery", element: <GalleryList /> },
      { path: "add-gallery", element: <AddGallery /> },
      // 회원가입/로그인/마이페이지
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "mypage", element: <Mypage /> },
      // 자유게시판
      { path: "free-board", element: <FreeBoardList /> },
      { path: "add-free-board", element: <AddFreeBoard /> },
      { path: "free-board-detail/:fid", element: <FreeBoardDetail /> },
      // 뉴스게시판
      { path: "news-board", element: <NewsBoardList /> },
      { path: "add-news-board", element: <AddNewsBoard /> },
      { path: "news-board-detail/:nid", element: <NewsBoardDetail /> },
      // 예약 게시판
      { path: "meeting-room", element: <MeetingRoomList /> },
      { path: "add-meeting-room", element: <AddMeetingRoom /> },
      { path: "meeting-room-detail/:mid", element: <MeetingRoomDetail /> },
      // 예약 게시판
      { path: "reservation", element: <ReservationList /> },
      { path: "add-reservation", element: <AddReservation /> },
      { path: "reservation-detail/:rid", element: <ReservationDetail /> },
      // 공용차량
      { path: "public-car", element: <PublicCarList /> },
      { path: "add-public-car", element: <AddPublicCar /> },
      { path: "public-car-detail/:pid", element: <PublicCarDetail /> },
      // 예약 게시판
      { path: "booking", element: <BookingList /> },
      { path: "add-booking", element: <AddBooking /> },
      { path: "booking-detail/:rid", element: <BookingDetail /> },
      // 전자결재: 템플릿 문서 게시판
      { path: "template", element: <TemplateList /> },
      { path: "add-template", element: <AddTemplate /> },
      // 전자결재: 문서 게시판
      { path: "document", element: <DocumentList /> },
      { path: "add-document", element: <AddDocument /> },
      // 전자결재 관련 라우트 추가
      { path: "add-approval/:docId", element: <AddApproval /> },
      { path: "approval-drafts", element: <ApprovalDrafts /> },
      { path: "approval-pending", element: <ApprovalPending /> },
      { path: "approval-completed", element: <ApprovalCompleted /> },
    ],
  },
]);

export default router;
