export function isDemoModeEnabled() {
  if (process.env.ENABLE_DEMO_MODE === "true") {
    return true;
  }

  return process.env.NODE_ENV !== "production";
}
