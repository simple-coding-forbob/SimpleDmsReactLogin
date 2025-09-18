// src/services/auth/AuthService.ts
import type IApiResponse from "../types/IApiResponse";
import type IAuth from "../types/auth/IAuth";
import type IJwt from "../types/auth/IJwt";
import common from "./CommonService";

const login = (user: IAuth) => {
  return common.post<IJwt>("/auth/login", user);
};

const logout = () => {
  localStorage.removeItem("accessToken");
  // 필요시 서버 로그아웃 API 호출 가능
};

const register = (user: IAuth) => {
  return common.post<IApiResponse<string>>("/auth/register", user);
};

const AuthService = {
  login,
  logout,
  register,
};

export default AuthService;
