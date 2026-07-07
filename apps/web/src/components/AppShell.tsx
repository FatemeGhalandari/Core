import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  canManageSettings,
  canViewReports,
  canWorkCases,
  useAuth,
} from "../features/auth/auth";
import { useWorkspaceLabels } from "../features/workspace/workspaceLabels";

function formatFieldLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function AppShell({ children }: { children: ReactNode }) {
  const { appName, caseLabelPlural, customerLabelPlural } =
    useWorkspaceLabels();
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <svg
              className="brand-logo"
              viewBox="0 0 40 40"
              focusable="false"
            >
              <rect width="40" height="40" rx="10" />
              <path d="M12 14h10.5c3.4 0 6.1 2.7 6.1 6.1S25.9 26 22.5 26H12" />
              <path d="M12 20h18" />
              <circle cx="12" cy="14" r="2.3" />
              <circle cx="30" cy="20" r="2.3" />
              <circle cx="12" cy="26" r="2.3" />
            </svg>
          </div>
          <div>
            <div className="brand-name">{appName}</div>
            <div className="brand-subtitle">Workflow Platform</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            to="/"
          >
            Dashboard
          </NavLink>

          {user && canWorkCases(user.role) && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              to="/cases"
            >
              {caseLabelPlural}
            </NavLink>
          )}

          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            to="/customers"
          >
            {customerLabelPlural}
          </NavLink>

          {user && canViewReports(user.role) && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              to="/reports"
            >
              Reports
            </NavLink>
          )}

          {user && canManageSettings(user.role) && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              to="/settings"
            >
              Settings
            </NavLink>
          )}
        </nav>

        <div className="sidebar-auth">
          {user ? (
            <>
              <div>
                <span>Signed in as</span>
                <strong>{user.name}</strong>
                <small>{formatFieldLabel(user.role)}</small>
              </div>

              <button
                className="secondary-button compact"
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="secondary-button compact" to="/login">
              Login
            </Link>
          )}
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}
