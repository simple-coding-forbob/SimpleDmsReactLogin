import { create } from "zustand";
import type { IAuthState } from "../types/auth/IAuthState";

export const useAuthStore = create<IAuthState>((set) => ({
  loggedIn: null,
  login: () => {
    set({ loggedIn: true });
  },
  logout: () => {
    set({ loggedIn: false });
  },
}));
