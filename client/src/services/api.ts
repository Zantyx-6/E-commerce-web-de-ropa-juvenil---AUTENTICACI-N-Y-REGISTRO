export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "CLIENT" | "ADMIN";
  };
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request<T>(path: string, body: object): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error de servidor");
  }

  return data as T;
}

export function loginRequest(payload: LoginPayload) {
  return request<AuthResponse>("/api/auth/login", payload);
}

export function registerRequest(payload: RegisterPayload) {
  return request<AuthResponse>("/api/auth/register", payload);
}
