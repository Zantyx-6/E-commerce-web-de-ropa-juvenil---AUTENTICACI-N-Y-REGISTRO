export interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  productCount?: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  comparePrice?: number | null;
  imageUrl: string;
  stock: number;
  featured: boolean;
  badge?: string | null;
  categoryId: number;
  category?: Category;
  createdAt: string;
}

export interface ProductFilters {
  categoryId?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
