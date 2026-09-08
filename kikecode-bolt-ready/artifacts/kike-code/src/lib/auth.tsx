import { createContext, useContext, useMemo, type ReactNode } from "react";

export type Operator = { name: string; role: { en: string; es: string } };

type AuthState = {
  authed: boolean;
  operator: Operator | null;
  loading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  openLogin: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

/**
 * Login has been removed — the customizer and create flows are open to everyone.
 * This provider keeps the same interface so existing components keep working,
 * but it always reports an authenticated state and never prompts for a password.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AuthState>(
    () => ({
      authed: true,
      operator: null,
      loading: false,
      login: async () => true,
      logout: async () => {},
      openLogin: () => {},
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
