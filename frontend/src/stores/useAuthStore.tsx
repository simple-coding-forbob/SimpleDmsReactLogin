import { create } from "zustand";
import type { IAuthState } from "../types/auth/IAuthState";

export const useAuthStore = create<IAuthState>((set) => ({
  jwt: JSON.parse(localStorage.getItem("jwt") || "null"),
  loggedIn: localStorage.getItem("jwt")!==null,
  
  login: (jwt) => {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    set({ jwt, loggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("jwt");
    set({ jwt: null, loggedIn: false });
  },
}));
