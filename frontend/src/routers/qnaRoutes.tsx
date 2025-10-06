import { lazy } from "react";

// QnA
const QnaList = lazy(() => import("../pages/qna/QnaList"));
const AddQna = lazy(() => import("../pages/qna/AddQna"));
const QnaDetail = lazy(() => import("../pages/qna/QnaDetail"));

export const qnaRoutes = [
  { path: "qna", element: <QnaList /> },
  { path: "add-qna", element: <AddQna /> },
  { path: "qna-detail/:qno", element: <QnaDetail /> },
];
