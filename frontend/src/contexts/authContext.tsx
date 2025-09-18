import { createContext } from "react";
import type { AuthContextType } from "../types/auth/IAuthContexttype";

// 기본값 지정
const defaultAuth: AuthContextType = {
  jwt: null,
  loggedIn: false,
  login: () => {},
  logout: () => {},
};

export const authContext = createContext<AuthContextType>(defaultAuth);