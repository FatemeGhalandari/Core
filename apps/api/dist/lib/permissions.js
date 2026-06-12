export function canManageSettings(role) {
    return role === "owner" || role === "admin";
}
export function canWorkCases(role) {
    return role === "owner" || role === "admin" || role === "staff";
}
export function canViewReports(role) {
    return role === "owner" || role === "admin" || role === "staff";
}
