import { createContext, useContext, useEffect, useState } from "react";
import {
  api,
  AUTH_STORAGE_KEY,
  DEMO_AUTO_OPEN_DISABLED_STORAGE_KEY,
  DEMO_ORGANIZATION_STORAGE_KEY,
  getDemoOrganizationSlug,
  setDemoOrganizationSlug,
} from "../../lib/api";

export type AppRole = "owner" | "admin" | "staff";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  organizationId: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isInitializing: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const DEFAULT_DEMO_ORGANIZATION_SLUG = "maplecare-clinic";

type DemoSessionResponse = {
  data: {
    user: AuthUser;
  };
};

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
  const [isInitializing, setIsInitializing] = useState(() => !user);

  useEffect(() => {
    if (user) {
      setIsInitializing(false);
      return;
    }

    const isAutoDemoDisabled =
      window.localStorage.getItem(DEMO_AUTO_OPEN_DISABLED_STORAGE_KEY) ===
      "true";

    if (isAutoDemoDisabled) {
      setIsInitializing(false);
      return;
    }

    let isActive = true;
    const demoOrganizationSlug =
      getDemoOrganizationSlug() || DEFAULT_DEMO_ORGANIZATION_SLUG;

    setDemoOrganizationSlug(demoOrganizationSlug);

    api
      .get<DemoSessionResponse>("/api/auth/demo-session", {
        params: {
          slug: demoOrganizationSlug,
        },
      })
      .then((response) => {
        if (!isActive) return;

        window.localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify(response.data.data.user),
        );
        setUser(response.data.data.user);
      })
      .catch(() => {
        if (!isActive) return;

        window.localStorage.removeItem(DEMO_ORGANIZATION_STORAGE_KEY);
      })
      .finally(() => {
        if (!isActive) return;

        setIsInitializing(false);
      });

    return () => {
      isActive = false;
    };
  }, [user]);

  function login(nextUser: AuthUser) {
    window.localStorage.removeItem(DEMO_AUTO_OPEN_DISABLED_STORAGE_KEY);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function logout() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.localStorage.removeItem(DEMO_ORGANIZATION_STORAGE_KEY);
    window.localStorage.setItem(DEMO_AUTO_OPEN_DISABLED_STORAGE_KEY, "true");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isInitializing, login, logout }}>
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
  return role === "owner" || role === "admin" || role === "staff";
}
