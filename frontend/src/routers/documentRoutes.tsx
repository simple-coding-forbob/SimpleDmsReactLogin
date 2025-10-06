import { lazy } from "react";

// 문서 게시판
const DocumentList = lazy(() => import("../pages/document/DocumentList"));
const AddDocument = lazy(() => import("../pages/document/AddDocument"));

export const documentRoutes = [
      { path: "document", element: <DocumentList /> },
      { path: "add-document", element: <AddDocument /> },
];
