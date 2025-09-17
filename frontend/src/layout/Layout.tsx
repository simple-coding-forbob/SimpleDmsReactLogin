import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

function Layout() {
  const navigate = useNavigate();

  // TODO: 토큰 없으면 로그인 페이지 강제 이동
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // 토큰 없으면 로그인 페이지로 이동
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      {/* 머리말 */}
      <Header />
      {/* 내용 */}
      <main className="container mx-auto mt-8">
        <Outlet />
      </main>
      {/* 꼬리말 */}
      <footer className="container mx-auto mt-8">forbob@naver.com</footer>
    </>
  );
}

export default Layout;
