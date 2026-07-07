import type { ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { formatFieldLabel } from "../cases/caseUtils";
import {
  canViewReports,
  canWorkCases,
  useAuth,
  type AppRole,
  type AuthUser,
} from "./auth";

function getDefaultAllowedPath(role: AppRole) {
  if (canWorkCases(role)) return "/";
  if (canViewReports(role)) return "/reports";
  return "/login";
}

function AccessDeniedPage({ user }: { user: AuthUser }) {
  const allowedPath = getDefaultAllowedPath(user.role);

  return (
    <AppShell>
      <div className="state-card access-denied-card">
        <h2>Access denied</h2>
        <p>
          You are signed in as {user.name} with the{" "}
          {formatFieldLabel(user.role)} role. This page needs a different level
          of access.
        </p>
        <Link className="primary-button" to={allowedPath}>
          Go to an allowed page
        </Link>
      </div>
    </AppShell>
  );
}

export function RequirePermission({
  children,
  allowed,
}: {
  children: ReactNode;
  allowed: (role: AppRole) => boolean;
}) {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <AppShell>
        <div className="state-card state-card-centered">
          <h2>Opening demo workspace...</h2>
          <p>Preparing the public Core demo for review.</p>
        </div>
      </AppShell>
    );
  }

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  if (!allowed(user.role)) {
    return <AccessDeniedPage user={user} />;
  }

  return children;
}
