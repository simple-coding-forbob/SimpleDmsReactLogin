import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

const loading = <div>Loading...</div>;

// 페이지 lazy 로딩
const Home = lazy(() => import("../pages/Home"));
const DeptList = lazy(() => import("../pages/dept/DeptList"));
const AddDept = lazy(() => import("../pages/dept/AddDept"));
const DeptDetail = lazy(() => import("../pages/dept/DeptDetail"));
const EmpList = lazy(() => import("../pages/emp/EmpList"));
const AddEmp = lazy(() => import("../pages/emp/AddEmp"));
const EmpDetail = lazy(() => import("../pages/emp/EmpDetail"));
const FaqList = lazy(() => import("../pages/faq/FaqList"));
const AddFaq = lazy(() => import("../pages/faq/AddFaq"));
const FaqDetail = lazy(() => import("../pages/faq/FaqDetail"));
const QnaList = lazy(() => import("../pages/qna/QnaList"));
const AddQna = lazy(() => import("../pages/qna/AddQna"));
const QnaDetail = lazy(() => import("../pages/qna/QnaDetail"));
const NoticeList = lazy(() => import("../pages/notice/NoticeList"));
const AddNotice = lazy(() => import("../pages/notice/AddNotice"));
const NoticeDetail = lazy(() => import("../pages/notice/NoticeDetail"));
const EventNoticeList = lazy(() => import("../pages/eventnotice/EventNoticeList"));
const AddEventNotice = lazy(() => import("../pages/eventnotice/AddEventNotice"));
const EventNoticeDetail = lazy(() => import("../pages/eventnotice/EventNoticeDetail"));
const FileDbList = lazy(() => import("../pages/filedb/FileDbList"));
const AddFileDb = lazy(() => import("../pages/filedb/AddFileDb"));
const GalleryList = lazy(() => import("../pages/gallery/GalleryList"));
const AddGallery = lazy(() => import("../pages/gallery/AddGallery"));
const LoginView = lazy(() => import("../pages/auth/LoginView"));
const RegisterView = lazy(() => import("../pages/auth/RegisterView"));
const Mypage = lazy(() => import("../pages/Mypage"));
const FreeBoardList = lazy(() => import("../pages/freeboard/FreeBoardList"));
const AddFreeBoard = lazy(() => import("../pages/freeboard/AddFreeBoard"));
const FreeBoardDetail = lazy(() => import("../pages/freeboard/FreeBoardDetail"));
const NewsBoardList = lazy(() => import("../pages/freeboard/FreeBoardList"));
const AddNewsBoard = lazy(() => import("../pages/freeboard/AddFreeBoard"));
const NewsBoardDetail = lazy(() => import("../pages/freeboard/FreeBoardDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={loading}><Home /></Suspense> },
      { path: "dept", element: <Suspense fallback={loading}><DeptList /></Suspense> },
      { path: "add-dept", element: <Suspense fallback={loading}><AddDept /></Suspense> },
      { path: "dept-detail/:dno", element: <Suspense fallback={loading}><DeptDetail /></Suspense> },
      { path: "emp", element: <Suspense fallback={loading}><EmpList /></Suspense> },
      { path: "add-emp", element: <Suspense fallback={loading}><AddEmp /></Suspense> },
      { path: "emp-detail/:eno", element: <Suspense fallback={loading}><EmpDetail /></Suspense> },
      { path: "faq", element: <Suspense fallback={loading}><FaqList /></Suspense> },
      { path: "add-faq", element: <Suspense fallback={loading}><AddFaq /></Suspense> },
      { path: "faq-detail/:fno", element: <Suspense fallback={loading}><FaqDetail /></Suspense> },
      { path: "qna", element: <Suspense fallback={loading}><QnaList /></Suspense> },
      { path: "add-qna", element: <Suspense fallback={loading}><AddQna /></Suspense> },
      { path: "qna-detail/:qno", element: <Suspense fallback={loading}><QnaDetail /></Suspense> },
      { path: "notice", element: <Suspense fallback={loading}><NoticeList /></Suspense> },
      { path: "add-notice", element: <Suspense fallback={loading}><AddNotice /></Suspense> },
      { path: "notice-detail/:nid", element: <Suspense fallback={loading}><NoticeDetail /></Suspense> },
      { path: "event-notice", element: <Suspense fallback={loading}><EventNoticeList /></Suspense> },
      { path: "add-event-notice", element: <Suspense fallback={loading}><AddEventNotice /></Suspense> },
      { path: "event-notice-detail/:eid", element: <Suspense fallback={loading}><EventNoticeDetail /></Suspense> },
      { path: "fileDb", element: <Suspense fallback={loading}><FileDbList /></Suspense> },
      { path: "add-fileDb", element: <Suspense fallback={loading}><AddFileDb /></Suspense> },
      { path: "gallery", element: <Suspense fallback={loading}><GalleryList /></Suspense> },
      { path: "add-gallery", element: <Suspense fallback={loading}><AddGallery /></Suspense> },
      { path: "login", element: <Suspense fallback={loading}><LoginView /></Suspense> },
      { path: "register", element: <Suspense fallback={loading}><RegisterView /></Suspense> },
      { path: "mypage", element: <Suspense fallback={loading}><Mypage /></Suspense> },
      { path: "free-board", element: <Suspense fallback={loading}><FreeBoardList /></Suspense> },
      { path: "add-free-board", element: <Suspense fallback={loading}><AddFreeBoard /></Suspense> },
      { path: "free-board-detail/:fid", element: <Suspense fallback={loading}><FreeBoardDetail /></Suspense> },
      { path: "news-board", element: <Suspense fallback={loading}><NewsBoardList /></Suspense> },
      { path: "add-news-board", element: <Suspense fallback={loading}><AddNewsBoard /></Suspense> },
      { path: "news-board-detail/:nid", element: <Suspense fallback={loading}><NewsBoardDetail /></Suspense> },
    ],
  },
]);

export default router;
