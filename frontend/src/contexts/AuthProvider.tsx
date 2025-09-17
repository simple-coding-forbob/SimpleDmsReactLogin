// src/contexts/AuthProvider.tsx
import React, { useState } from "react";
import type { ReactNode } from "react";
import { authContext } from "./authContext";

interface AuthProviderProps { children: ReactNode }

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    JSON.parse(localStorage.getItem("accessToken") || "null")
  );

  // user가 존재하면 true, 없으면 false
  const loggedIn = !!accessToken;
  const login = (accessToken: string) => { localStorage.setItem("accessToken", JSON.stringify(accessToken)); setAccessToken(accessToken); }
  const logout = () => { localStorage.removeItem("accessToken"); setAccessToken(null); }

  return (
    <authContext.Provider value={{ accessToken, loggedIn, login, logout }}>
      {children}
    </authContext.Provider>
  );
};