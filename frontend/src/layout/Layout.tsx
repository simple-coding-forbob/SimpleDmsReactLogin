import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Header from "./Header";

function Layout() {
  const loc = useLocation();
  const { loggedIn } = useAuthStore();

  // 로그인/회원가입 페이지는 가드 제외
  const noAuthRequired = ["/login", "/register"];
  const isNoAuthPage = noAuthRequired.includes(loc.pathname);

  // 아직 확인 전이면 렌더링 지연
  if (loggedIn === null) return null; // or 로딩 스피너

  if (!loggedIn && !isNoAuthPage) {
    // 로그인 상태가 아니면 로그인 페이지로 이동
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
