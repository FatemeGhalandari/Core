import axios from "axios";

export const AUTH_STORAGE_KEY = "core.auth.user";
export const DEMO_ORGANIZATION_STORAGE_KEY = "core.demo.organizationSlug";

type StoredAuthUser = {
  id?: unknown;
};

function getApiBaseUrl() {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl && import.meta.env.PROD) {
    throw new Error("VITE_API_URL must be set for production builds.");
  }

  return apiUrl ?? "http://localhost:4000";
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
  const demoOrganizationSlug = window.localStorage.getItem(
    DEMO_ORGANIZATION_STORAGE_KEY,
  );

  if (demoOrganizationSlug) {
    config.headers.set("x-demo-organization-slug", demoOrganizationSlug);
  }

  if (!storedUser) {
    return config;
  }

  try {
    const user = JSON.parse(storedUser) as StoredAuthUser;

    if (typeof user.id === "string") {
      config.headers.set("x-user-id", user.id);
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return config;
});

export function getDemoOrganizationSlug() {
  return window.localStorage.getItem(DEMO_ORGANIZATION_STORAGE_KEY) ?? "";
}

export function setDemoOrganizationSlug(slug: string) {
  if (!slug) {
    window.localStorage.removeItem(DEMO_ORGANIZATION_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(DEMO_ORGANIZATION_STORAGE_KEY, slug);
}
