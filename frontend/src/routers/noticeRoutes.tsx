import { lazy } from "react";

// 공지사항
const NoticeList = lazy(() => import("../pages/notice/NoticeList"));
const AddNotice = lazy(() => import("../pages/notice/AddNotice"));
const NoticeDetail = lazy(() => import("../pages/notice/NoticeDetail"));

export const noticeRoutes = [
  { path: "notice", element: <NoticeList /> },
  { path: "add-notice", element: <AddNotice /> },
  { path: "notice-detail/:nid", element: <NoticeDetail /> },
];
