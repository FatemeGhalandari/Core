export type AppRole = "owner" | "admin" | "staff";

export function canManageSettings(role: AppRole) {
  return role === "owner" || role === "admin";
}

export function canWorkCases(role: AppRole) {
  return role === "owner" || role === "admin" || role === "staff";
}

export function canViewReports(role: AppRole) {
  return role === "owner" || role === "admin" || role === "staff";
}
