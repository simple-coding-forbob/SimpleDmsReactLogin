import { useContext } from "react";

import { authContext } from "./authContext";
import type { AuthContextType } from "../types/auth/IAuthContexttype";

// 커스텀 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};