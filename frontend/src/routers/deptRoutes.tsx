import { lazy } from "react";

// 부서
const DeptList = lazy(() => import("../pages/dept/DeptList"));
const AddDept = lazy(() => import("../pages/dept/AddDept"));
const DeptDetail = lazy(() => import("../pages/dept/DeptDetail"));

export const deptRoutes = [
  { path: "dept", element: <DeptList /> },
  { path: "add-dept", element: <AddDept /> },
  { path: "dept-detail/:dno", element: <DeptDetail /> },
];
