import { lazy } from "react";

// 템플릿 게시판
const TemplateList = lazy(() => import("../pages/template/TemplateList"));
const AddTemplate = lazy(() => import("../pages/template/AddTemplate"));

export const templateRoutes = [
  { path: "template", element: <TemplateList /> },
  { path: "add-template", element: <AddTemplate /> },
];
