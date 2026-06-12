import axios from "axios";

const AUTH_STORAGE_KEY = "core.auth.user";

type StoredAuthUser = {
  id?: unknown;
};

export const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

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
