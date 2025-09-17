// src/contexts/AuthTypes.ts

export interface AuthContextType {
  accessToken: string | null;
  loggedIn: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}
