export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: "CLIENT" | "ADMIN";
};

const STORAGE_KEY = "vibe-pulse-auth";

export function getAuth(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setAuth(user: AuthUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY);
}
