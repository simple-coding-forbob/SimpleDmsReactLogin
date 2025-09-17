import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import AddDept from "../pages/dept/AddDept";
import DeptDetail from "../pages/dept/DeptDetail";
import DeptList from "../pages/dept/DeptList";
import AddEmp from "../pages/emp/AddEmp";
import EmpDetail from "../pages/emp/EmpDetail";
import EmpList from "../pages/emp/EmpList";
import AddFileDb from "../pages/filedb/AddFileDb";
import FiledbList from "../pages/filedb/FileDbList";
import AddGallery from "../pages/gallery/AddGallery";
import GalleryList from "../pages/gallery/GalleryList";
import FaqList from "../pages/faq/FaqList";
import AddFaq from "../pages/faq/AddFaq";
import FaqDetail from "../pages/faq/FaqDetail";
import QnaList from "../pages/qna/QnaList";
import AddQna from "../pages/qna/AddQna";
import QnaDetail from "../pages/qna/QnaDetail";
import NoticeList from "../pages/notice/NoticeList";
import NoticeDetail from "../pages/notice/NoticeDetail";
import AddNotice from "../pages/notice/AddNotice";
import EventNoticeList from "../pages/eventnotice/EventNoticeList";
import AddEventNotice from "../pages/eventnotice/AddEventNotice";
import EventNoticeDetail from "../pages/eventnotice/EventNoticeDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
      { path: "event-notice-detail/:nid", element: <EventNoticeDetail /> },
      { path: "fileDb", element: <FiledbList /> },
      { path: "add-fileDb", element: <AddFileDb /> },
      { path: "gallery", element: <GalleryList /> },
      { path: "add-gallery", element: <AddGallery /> },
    ],
  },
]);

export default router;
