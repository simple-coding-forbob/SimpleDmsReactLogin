import type { IJwt } from "./IJwt";

export interface IAuthState {
  jwt: IJwt | null;
  loggedIn: boolean;
  login: (jwt: IJwt) => void;
  logout: () => void;
}
