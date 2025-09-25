import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

function Layout() {
  const loc = useLocation();
  const jwt = localStorage.getItem("jwt");

  // 로그인/회원가입 페이지는 가드 제외
  const noAuthRequired = ["/login", "/register"];
  const isNoAuthPage = noAuthRequired.includes(loc.pathname);

  if (!jwt && !isNoAuthPage) {
    // 토큰 없으면 로그인 페이지로 이동
    return <Navigate to="/login" replace />;
  }  

  return (
    <>
      {/* 머리말 */}
      <Header />
      {/* 내용 */}
      <main className="container mx-auto mt-8 px-3">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
