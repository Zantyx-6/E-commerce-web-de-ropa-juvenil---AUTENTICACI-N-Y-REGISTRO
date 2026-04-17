import axios from "axios";
import type {
  Category,
  PaginatedResponse,
  Product,
  ProductFilters,
} from "../types/catalog";

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

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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

async function requestGet<T>(path: string, params?: Record<string, unknown>): Promise<T> {
  try {
    const { data } = await api.get<T>(path, { params });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data?.error;
      const errorMessage = typeof errData === "object" ? errData.message : errData;
      throw new Error(errorMessage || "Error de servidor");
    }
    throw new Error("Error de conexión con el servidor");
  }
}

async function requestAuth<T>(
  method: "post" | "put" | "delete",
  path: string,
  body?: object
): Promise<T> {
  try {
    const { data } = await api.request<T>({
      method,
      url: path,
      data: body,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
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

export function getProductsRequest(filters: ProductFilters = {}) {
  return requestGet<{ success: boolean } & PaginatedResponse<Product>>("/api/products", filters as Record<string, unknown>);
}

export function getFeaturedProductsRequest() {
  return requestGet<ApiResponse<Product[]>>("/api/products/featured");
}

export function getProductByIdRequest(id: number) {
  return requestGet<ApiResponse<Product>>(`/api/products/${id}`);
}

export function getCategoriesRequest() {
  return requestGet<ApiResponse<Category[]>>("/api/categories");
}

export function createCategoryRequest(payload: {
  name: string;
  slug: string;
  imageUrl?: string;
  description?: string;
}) {
  return requestAuth<ApiResponse<Category>>("post", "/api/categories", payload);
}

export function createProductRequest(payload: {
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  imageUrl: string;
  stock: number;
  featured: boolean;
  badge?: string;
  categoryId: number;
}) {
  return requestAuth<ApiResponse<Product>>("post", "/api/products", payload);
}

export function updateProductRequest(
  id: number,
  payload: Partial<{
    name: string;
    description: string;
    price: number;
    comparePrice: number | null;
    imageUrl: string;
    stock: number;
    featured: boolean;
    badge: string | null;
    categoryId: number;
  }>
) {
  return requestAuth<ApiResponse<Product>>("put", `/api/products/${id}`, payload);
}

export function deleteProductRequest(id: number) {
  return requestAuth<{ success: boolean; message: string }>("delete", `/api/products/${id}`);
}
