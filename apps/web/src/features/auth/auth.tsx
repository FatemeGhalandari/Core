import { createContext, useContext, useState } from "react";

export type AppRole = "owner" | "admin" | "staff" | "viewer";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  organizationId: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "core.auth.user";

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuthUser() {
  const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredAuthUser());

  function login(nextUser: AuthUser) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function logout() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return auth;
}

export function canManageSettings(role: AppRole) {
  return role === "owner" || role === "admin";
}

export function canWorkCases(role: AppRole) {
  return role === "owner" || role === "admin" || role === "staff";
}

export function canViewReports(role: AppRole) {
  return (
    role === "owner" ||
    role === "admin" ||
    role === "staff" ||
    role === "viewer"
  );
}
