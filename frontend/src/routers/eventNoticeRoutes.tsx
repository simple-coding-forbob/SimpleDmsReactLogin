import { lazy } from "react";

// 이벤트 공지
const EventNoticeList = lazy(() => import("../pages/eventnotice/EventNoticeList"));
const AddEventNotice = lazy(() => import("../pages/eventnotice/AddEventNotice"));
const EventNoticeDetail = lazy(() => import("../pages/eventnotice/EventNoticeDetail"));

export const eventNoticeRoutes = [
  { path: "event-notice", element: <EventNoticeList /> },
  { path: "add-event-notice", element: <AddEventNotice /> },
  { path: "event-notice-detail/:eid", element: <EventNoticeDetail /> },
];
