// src/services/auth/AuthService.ts
import common from "../common/CommonService";
import type { IAuth } from "../types/auth/IAuth";

const login = (user: IAuth) => {
  return common.post("/auth/login", user);
};

const logout = () => {
  return common.post("/auth/logout");
};

const register = (user: IAuth) => {
  return common.post("/auth/register", user);
};

const mypage = () => {
  return common.get("/mypage");
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
