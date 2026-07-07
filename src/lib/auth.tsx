import { createContext, ReactNode, useContext, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { User } from "./types";

type AuthCtx = {
  user: User | null;
  login: (username: string, password: string) => { ok: boolean; message?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

const ACCOUNTS: { username: string; password: string; user: User }[] = [
  { username: "admin", password: "admin123", user: { username: "admin", role: "admin", name: "Administrator" } },
  { username: "guru", password: "guru123", user: { username: "guru", role: "guru", name: "Bapak Budi, S.Kom" } },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("presensi.user", null);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      login: (username, password) => {
        const a = ACCOUNTS.find((x) => x.username === username && x.password === password);
        if (!a) return { ok: false, message: "Username atau password salah" };
        setUser(a.user);
        return { ok: true };
      },
      logout: () => setUser(null),
    }),
    [user, setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
