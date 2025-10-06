import { lazy } from "react";

// 자유게시판
const FreeBoardList = lazy(() => import("../pages/freeboard/FreeBoardList"));
const AddFreeBoard = lazy(() => import("../pages/freeboard/AddFreeBoard"));
const FreeBoardDetail = lazy(
  () => import("../pages/freeboard/FreeBoardDetail")
);

export const freeBoardRoutes = [
  { path: "free-board", element: <FreeBoardList /> },
  { path: "add-free-board", element: <AddFreeBoard /> },
  { path: "free-board-detail/:fid", element: <FreeBoardDetail /> },
];
