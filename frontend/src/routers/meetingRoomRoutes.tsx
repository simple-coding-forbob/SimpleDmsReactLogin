import { lazy } from "react";

// 예약 게시판
const MeetingRoomList = lazy(() => import("../pages/meetingroom/MeetingRoomList"));
const AddMeetingRoom = lazy(() => import("../pages/meetingroom/AddMeetingRoom"));
const MeetingRoomDetail = lazy(() => import("../pages/meetingroom/MeetingRoomDetail"));

export const meetingRoomRoutes = [
  { path: "meeting-room", element: <MeetingRoomList /> },
  { path: "add-meeting-room", element: <AddMeetingRoom /> },
  { path: "meeting-room-detail/:mid", element: <MeetingRoomDetail /> },
];
