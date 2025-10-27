// src/pages/auth/RegisterView.tsx
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import { Meta } from "react-head";
import registerImg from "../../assets/images/puppy-1920_1280_2.webp";
import AuthService from "../../services/AuthService";
import type { IAuth } from "../../types/auth/IAuth";
import registerValidation from "../../validation/registerValidation";

export default function RegisterView() {
  const nav = useNavigate();
  const handleRegister = async (values: IAuth) => {
    await AuthService.register(values); // 서버 POST
    alert("회원가입을 성공했습니다.");
    nav("/login");
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", repassword: "", name: "",eno: "" },
    validationSchema: registerValidation,
    onSubmit: handleRegister,
  });

  return (
    <div className="flex items-center justify-center">
      <Meta name="description" content="회원가입 페이지입니다." />
      <div className="w-full max-w-5xl rounded-lg flex">
        {/* 이미지 영역 */}
        <div className="hidden lg:flex lg:w-1/2  items-center justify-center">
          <img
            src={registerImg}
            loading="lazy"
            alt="회원가입"
            className="w-4/5 h-4/5 object-cover"
          />
        </div>

        {/* 폼 영역 */}
        <div className="w-full lg:w-1/2 p-8">
          <h3 className="text-4xl font-bold mb-6 text-center">회원 가입</h3>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block mb-1 font-bold">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일을 넣기"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-500"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block mb-1 font-bold">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="패스워드 넣기"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-500"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label htmlFor="repassword" className="block mb-1 font-bold">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="repassword"
                name="repassword"
                placeholder="패스워드 다시 넣기"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-500"
                value={formik.values.repassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.repassword && formik.errors.repassword && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.repassword}
                </div>
              )}
            </div>

            {/* 이름 */}
            <div>
              <label htmlFor="name" className="block mb-1 font-bold">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름 입력"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-500"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.name}
                </div>
              )}
            </div>

            {/* eno */}
            <div>
              <label htmlFor="eno" className="block mb-1 font-bold">
                사원번호
              </label>
              <input
                type="text"
                id="eno"
                name="eno"
                placeholder="사원번호 입력"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-500"
                value={formik.values.eno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.eno && formik.errors.eno && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.eno}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
            >
              회원 가입
            </button>
          </form>

          <hr className="my-4" />

          <div className="text-center space-x-4">
            <Link to="/login" className="text-sm text-gray-600 hover:underline">
              계정이 있으신가요? 로그인!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
