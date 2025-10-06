import { lazy } from "react";

const EmpList = lazy(() => import("../pages/emp/EmpList"));
const AddEmp = lazy(() => import("../pages/emp/AddEmp"));
const EmpDetail = lazy(() => import("../pages/emp/EmpDetail"));

export const empRoutes = [
  { path: "emp", element: <EmpList /> },
  { path: "add-emp", element: <AddEmp /> },
  { path: "emp-detail/:eno", element: <EmpDetail /> },
];
