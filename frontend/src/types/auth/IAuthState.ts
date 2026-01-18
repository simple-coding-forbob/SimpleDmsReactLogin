import type { IJwt } from "./IJwt";

export interface IAuthState {
  loggedIn: boolean;
  login: (jwt: IJwt) => void;
  logout: () => void;
}
