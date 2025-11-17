import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import { approvalRoutes } from "./approvalRoutes";
import { authRoutes } from "./authRoutes";
import { bookingRoutes } from "./bookingRoutes";
import { deptRoutes } from "./deptRoutes";
import { documentRoutes } from "./documentRoutes";
import { empRoutes } from "./empRoutes";
import { eventNoticeRoutes } from "./eventNoticeRoutes";
import { faqRoutes } from "./faqRoutes";
import { fileDbRoutes } from "./fileDbRoutes";
import { freeBoardRoutes } from "./freeBoardRoutes";
import { galleryRoutes } from "./galleryRoutes";
import { meetingRoomRoutes } from "./meetingRoomRoutes";
import { newsBoardRoutes } from "./newsBoardRoutes";
import { noticeRoutes } from "./noticeRoutes";
import { publicCarRoutes } from "./publicCarRoutes";
import { qnaRoutes } from "./qnaRoutes";
import { reservationRoutes } from "./reservationRoutes";
import { templateRoutes } from "./templateRoutes";

// 공통 로딩 컴포넌트
const loading = <div>Loading...</div>;

// 페이지 lazy 로딩
const Home = lazy(() => import("../pages/Home"));

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
      ...deptRoutes,
      ...empRoutes,
      ...faqRoutes,
      ...qnaRoutes,
      ...noticeRoutes,
      ...eventNoticeRoutes,
      ...fileDbRoutes,
      ...galleryRoutes,
      ...authRoutes,
      ...freeBoardRoutes,
      ...newsBoardRoutes,
      ...meetingRoomRoutes,
      ...reservationRoutes,
      ...publicCarRoutes,
      ...bookingRoutes,
      ...templateRoutes,
      ...documentRoutes,
      ...approvalRoutes
    ],
  },
]);

export default router;
