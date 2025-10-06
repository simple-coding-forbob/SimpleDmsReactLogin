import { lazy } from "react";

// 뉴스게시판
const NewsBoardList = lazy(() => import("../pages/newsboard/NewsBoardList"));
const AddNewsBoard = lazy(() => import("../pages/newsboard/AddNewsBoard"));
const NewsBoardDetail = lazy(
  () => import("../pages/newsboard/NewsBoardDetail")
);

export const newsBoardRoutes = [
      { path: "news-board", element: <NewsBoardList /> },
      { path: "add-news-board", element: <AddNewsBoard /> },
      { path: "news-board-detail/:nid", element: <NewsBoardDetail /> },
];
