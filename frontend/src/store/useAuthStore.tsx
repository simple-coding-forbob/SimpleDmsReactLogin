import { create } from "zustand";
import type { IAuthState } from "../types/auth/IAuthState";

export const useAuthStore = create<IAuthState>((set) => ({
  loggedIn: localStorage.getItem("jwt") !== null,

  login: (jwt) => {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    set({ loggedIn: true });
  },
  logout: () => {
    localStorage.removeItem("jwt");
    set({ loggedIn: false });
  },
}));
