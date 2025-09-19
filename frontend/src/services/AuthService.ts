// src/services/auth/AuthService.ts
import type IApiResponse from "../types/IApiResponse";
import type IAuth from "../types/auth/IAuth";
import type IJwt from "../types/auth/IJwt";
import common from "./CommonService";

const login = (user: IAuth) => {
  return common.post<IJwt>("/auth/login", user);
};

const register = (user: IAuth) => {
  return common.post<IApiResponse<string>>("/auth/register", user);
};

const mypage = () => {
  return common.get<IApiResponse<IAuth>>("/mypage");
};

const AuthService = {
  login,
  register,
  mypage
};

export default AuthService;
