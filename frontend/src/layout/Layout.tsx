import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
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
