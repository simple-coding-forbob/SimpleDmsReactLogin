// src/services/auth/AuthService.ts
import common from "../common/CommonService";
import type IAuth from "../types/auth/IAuth";

const login = (user: IAuth) => {
  return common.post("/auth/login", user);
};

const register = (user: IAuth) => {
  return common.post("/auth/register", user);
};

const mypage = () => {
  return common.get("/mypage");
};

const AuthService = {
  login,
  register,
  mypage
};

export default AuthService;
