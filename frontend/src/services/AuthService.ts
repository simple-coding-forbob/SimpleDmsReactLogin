// src/services/auth/AuthService.ts
import axiosInstance from "../common/axiosInstance";
import type { IAuth } from "../types/auth/IAuth";

const login = (user: IAuth) => {
  return axiosInstance.post("/auth/login", user);
};

const register = (user: IAuth) => {
  return axiosInstance.post("/auth/register", user);
};

const mypage = () => {
  return axiosInstance.get("/mypage");
};

const AuthService = {
  login,
  register,
  mypage
};

export default AuthService;
