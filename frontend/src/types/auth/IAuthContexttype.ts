// src/contexts/AuthTypes.ts

import type IJwt from "./IJwt";

export interface AuthContextType {
  jwt: IJwt | null;
  loggedIn: boolean;
  login: (jwt: IJwt) => void;
  logout: () => void;
}
