import { lazy } from "react";

const FaqList = lazy(() => import("../pages/faq/FaqList"));
const AddFaq = lazy(() => import("../pages/faq/AddFaq"));
const FaqDetail = lazy(() => import("../pages/faq/FaqDetail"));

export const faqRoutes = [
  { path: "faq", element: <FaqList /> },
  { path: "add-faq", element: <AddFaq /> },
  { path: "faq-detail/:fno", element: <FaqDetail /> },
];
