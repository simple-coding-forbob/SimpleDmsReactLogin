// src/contexts/AuthProvider.tsx
import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import { authContext } from "./authContext";
import type IJwt from "../types/auth/IJwt";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [jwt, setJwt] = useState<IJwt | null>(
    JSON.parse(localStorage.getItem("accessToken") || "null")
  );

  // user가 존재하면 true, 없으면 false
  const loggedIn = !!jwt;
  const login = (jwt: IJwt) => { localStorage.setItem("jwt", JSON.stringify(jwt)); setJwt(jwt); }
  const logout = () => { localStorage.removeItem("jwt"); setJwt(null); }

  return (
    <authContext.Provider value={{ jwt, loggedIn, login, logout }}>
      {children}
    </authContext.Provider>
  );
};