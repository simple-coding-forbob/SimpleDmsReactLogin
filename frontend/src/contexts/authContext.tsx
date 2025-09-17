import { createContext } from "react";
import type { AuthContextType } from "../types/auth/IAuthContexttype";

export const authContext = createContext<AuthContextType | undefined>(undefined);