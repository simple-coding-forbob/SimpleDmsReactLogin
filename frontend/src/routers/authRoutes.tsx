import { lazy } from "react";

// 회원/로그인
const LoginView = lazy(() => import("../pages/auth/LoginView"));
const RegisterView = lazy(() => import("../pages/auth/RegisterView"));
const Mypage = lazy(() => import("../pages/Mypage"));

export const authRoutes = [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "mypage", element: <Mypage /> },
];
