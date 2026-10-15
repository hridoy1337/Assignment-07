import type { Category, Product } from "./types";

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request<T>(path: string): Promise<T | null> {
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.status === 404) return null;
      if (res.ok) return (await res.json()) as T;
    } catch {
      continue;
    }
  }
  return null;
}

export async function getProducts() {
  return (await request<Product[]>("/products")) ?? [];
}

export async function getProductsByCategory(slug: string) {
  return (await request<Product[]>(`/products?category=${encodeURIComponent(slug)}`)) ?? [];
}

export async function getProduct(slug: string) {
  const list = await request<Product[]>(`/products?slug=${encodeURIComponent(slug)}`);
  if (!list || list.length === 0) return null;
  const detail = await request<Product>(`/products/${list[0].id}`);
  return detail ?? list[0];
}

export async function getCategory(slug: string) {
  const category = await request<Category>(`/categories/${encodeURIComponent(slug)}`);
  if (!category || !category.slug) return null;
  return category;
}
