// src/pages/auth/LoginView.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import authValidation from "../../utils/authValidation"; // Yup 스키마
import AuthService from "../../services/AuthService";
import type IAuth from "../../types/auth/IAuth";
import loginImg from "../../assets/images/puppy-1920_1280.jpg"
import { useAuth } from "../../contexts/useAuth";

function LoginView() {
  const { loggedIn, login } = useAuth();
  const navigate = useNavigate();

  // 이미 로그인 상태이면 홈으로 이동
  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  const handleLogin = async (data: IAuth) => {
    try {
      const response = await AuthService.login(data);
      const { result } = response.data;
      console.log(response.data);
      login(result); // Context 상태 업데이트
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: authValidation,
    onSubmit: handleLogin,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-5xl rounded-lg flex">
        {/* 이미지 영역: 작은 화면에서는 보이지 않고, 큰 화면에서만 반쪽 크기로 보이는 요소 */}
        {/* object-cover: 비율을 유지하면 채우기 */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={loginImg}
            alt="로그인"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 로그인 폼 영역 */}
        <div className="w-full lg:w-1/2 p-8">
          <h3 className="text-4xl font-bold mb-6 text-center">simple-coding</h3>
          {/* space-y-4: 자식박스사이 세로(y) 간격 일정하게 주기: 4 */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* 이메일 */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="이메일을 넣기"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-500"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>

            {/* 비밀번호 */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="패스워드 넣기"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-500"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          <hr className="my-4" />

          <div className="space-y-2">
            <a
              href="/"
              className="block w-full text-center bg-red-500 text-white p-3 rounded hover:bg-red-600 transition"
            >
              Login with Google
            </a>
            <a
              href="/"
              className="block w-full text-center bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
            >
              Login with Naver
            </a>
            <a
              href="/"
              className="block w-full text-center bg-yellow-400 text-black p-3 rounded hover:bg-yellow-500 transition"
            >
              Login with Kakao
            </a>
          </div>

          <hr className="my-4" />

          <div className="text-center space-x-4">
            <a href="#" className="text-sm text-gray-600 hover:underline">
              비밀번호을 잊었나요?
            </a>
            <a href="/register" className="text-sm text-gray-600 hover:underline">
              계정이 없나요!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
