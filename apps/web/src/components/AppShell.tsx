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
          <div className="brand-mark">{appName.charAt(0).toUpperCase()}</div>
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
