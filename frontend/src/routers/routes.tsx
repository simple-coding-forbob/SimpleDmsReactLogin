import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

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

// FAQ
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

// 이벤트 공지
const EventNoticeList = lazy(
  () => import("../pages/eventnotice/EventNoticeList")
);
const AddEventNotice = lazy(
  () => import("../pages/eventnotice/AddEventNotice")
);
const EventNoticeDetail = lazy(
  () => import("../pages/eventnotice/EventNoticeDetail")
);

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
const NewsBoardList = lazy(() => import("../pages/freeboard/FreeBoardList"));
const AddNewsBoard = lazy(() => import("../pages/freeboard/AddFreeBoard"));
const NewsBoardDetail = lazy(
  () => import("../pages/freeboard/FreeBoardDetail")
);

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

// 예약 게시판
const BookingList = lazy(() => import("../pages/booking/BookingList"));
const AddBooking = lazy(() => import("../pages/booking/AddBooking"));
const BookingDetail = lazy(() => import("../pages/booking/BookingDetail"));

// 문서 게시판
const DocumentList = lazy(() => import("../pages/document/DocumentList"));
const AddDocument = lazy(() => import("../pages/document/AddDocument"));

// 전자결재 게시판
const ApprovalDrafts = lazy(() => import("../pages/approval/ApprovalDrafts"));
const ApprovalPending = lazy(() => import("../pages/approval/ApprovalPending"));
const ApprovalCompleted = lazy(() => import("../pages/approval/ApprovalCompleted"));
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
      { path: "dept", element: <DeptList /> },
      { path: "add-dept", element: <AddDept /> },
      { path: "dept-detail/:dno", element: <DeptDetail /> },
      { path: "emp", element: <EmpList /> },
      { path: "add-emp", element: <AddEmp /> },
      { path: "emp-detail/:eno", element: <EmpDetail /> },
      { path: "faq", element: <FaqList /> },
      { path: "add-faq", element: <AddFaq /> },
      { path: "faq-detail/:fno", element: <FaqDetail /> },
      { path: "qna", element: <QnaList /> },
      { path: "add-qna", element: <AddQna /> },
      { path: "qna-detail/:qno", element: <QnaDetail /> },
      { path: "notice", element: <NoticeList /> },
      { path: "add-notice", element: <AddNotice /> },
      { path: "notice-detail/:nid", element: <NoticeDetail /> },
      { path: "event-notice", element: <EventNoticeList /> },
      { path: "add-event-notice", element: <AddEventNotice /> },
      { path: "event-notice-detail/:eid", element: <EventNoticeDetail /> },
      { path: "fileDb", element: <FileDbList /> },
      { path: "add-fileDb", element: <AddFileDb /> },
      { path: "gallery", element: <GalleryList /> },
      { path: "add-gallery", element: <AddGallery /> },
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "mypage", element: <Mypage /> },
      { path: "free-board", element: <FreeBoardList /> },
      { path: "add-free-board", element: <AddFreeBoard /> },
      { path: "free-board-detail/:fid", element: <FreeBoardDetail /> },
      { path: "news-board", element: <NewsBoardList /> },
      { path: "add-news-board", element: <AddNewsBoard /> },
      { path: "news-board-detail/:nid", element: <NewsBoardDetail /> },
      { path: "reservation", element: <ReservationList /> },
      { path: "add-reservation", element: <AddReservation /> },
      { path: "reservation-detail/:rid", element: <ReservationDetail /> },
      { path: "booking", element: <BookingList /> },
      { path: "add-booking", element: <AddBooking /> },
      { path: "booking-detail/:rid", element: <BookingDetail /> },
      { path: "document", element: <DocumentList /> },
      { path: "add-document", element: <AddDocument /> },
      { path: "add-approval/:uuid", element: <AddApproval /> },
      { path: "approval-drafts", element: <ApprovalDrafts /> },
      { path: "approval-pending", element: <ApprovalPending /> },
      { path: "approval-completed", element: <ApprovalCompleted /> },
    ],
  },
]);

export default router;
