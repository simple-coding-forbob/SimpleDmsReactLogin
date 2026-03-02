// src/services/auth/AuthService.ts
<<<<<<< Updated upstream
import axiosInstance from "../common/axiosInstance";
=======
import common from "../common/CommonService";
>>>>>>> Stashed changes
import type { IAuth } from "../types/auth/IAuth";

const login = (user: IAuth) => {
  return axiosInstance.post("/auth/login", user);
};

const logout = () => {
  return common.post("/auth/logout");
};

const register = (user: IAuth) => {
  return axiosInstance.post("/auth/register", user);
};

const mypage = () => {
  return axiosInstance.get("/mypage");
};

const me = () => {
  return common.get("/auth/me");
};

const AuthService = {
  login,
  logout,
  register,
  mypage,
  me,
};

export default AuthService;
