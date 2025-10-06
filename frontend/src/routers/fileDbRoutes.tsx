import { lazy } from "react";

// 파일 DB
const FileDbList = lazy(() => import("../pages/filedb/FileDbList"));
const AddFileDb = lazy(() => import("../pages/filedb/AddFileDb"));

export const fileDbRoutes = [
      { path: "fileDb", element: <FileDbList /> },
      { path: "add-fileDb", element: <AddFileDb /> },
];
