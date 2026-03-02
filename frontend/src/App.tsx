import { useEffect } from "react";
import { HeadProvider } from "react-head";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routers/router";
import AuthService from "./services/AuthService";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { login } = useAuthStore();

  useEffect(() => {
    const checkLogin = async () => {
        await AuthService.me(); // 서버에서 로그인 상태 확인
        login(); // 유효하면 상태 업데이트
    };
    checkLogin();
  }, [login]);

  return (
    <HeadProvider>
      <RouterProvider router={router} />
    </HeadProvider>
  );
}

export default App;
