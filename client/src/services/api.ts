import axios from "axios";

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
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "CLIENT" | "ADMIN";
  };
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token JWT a todas las requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vibe-pulse-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function request<T>(path: string, body: object): Promise<T> {
  try {
    const { data } = await api.post<T>(path, body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 429) {
        throw new Error("Exceso de peticiones, espere un momento");
      }
      const errData = error.response.data?.error;
      const errorMessage = typeof errData === "object" ? errData.message : errData;
      throw new Error(errorMessage || "Error de servidor");
    }
    throw new Error("Error de conexión con el servidor");
  }
}

export function loginRequest(payload: LoginPayload) {
  return request<AuthResponse>("/api/auth/login", payload);
}

export function registerRequest(payload: RegisterPayload) {
  return request<AuthResponse>("/api/auth/register", payload);
}
