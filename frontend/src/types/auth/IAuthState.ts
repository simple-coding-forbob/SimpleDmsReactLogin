
export interface IAuthState {
  loggedIn: boolean|null;
  login: () => void;
  logout: () => void;
}
