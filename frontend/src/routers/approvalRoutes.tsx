import { lazy } from "react";

// 전자결재 게시판
const ApprovalDrafts = lazy(() => import("../pages/approval/ApprovalDrafts"));
const ApprovalPending = lazy(() => import("../pages/approval/ApprovalPending"));
const ApprovalCompleted = lazy(
  () => import("../pages/approval/ApprovalCompleted")
);
const AddApproval = lazy(() => import("../pages/approval/AddApproval"));

export const approvalRoutes = [
  { path: "add-approval/:docId", element: <AddApproval /> },
  { path: "approval-drafts", element: <ApprovalDrafts /> },
  { path: "approval-pending", element: <ApprovalPending /> },
  { path: "approval-completed", element: <ApprovalCompleted /> },
];
