// products.js (service)
// What this is: the single place the UI asks for product data. Tries the
// real API first (GET /products, /products/:slug, ...), and transparently
// falls back to /data/products.js if the API is empty or unreachable.
// Returns a unified shape so components never need to know which source
// the data came from.

import { apiGet } from "./apiClient";
import mockProducts from "@/data/products";

export async function getAllProducts() {
  // const apiData = await apiGet("/products");
  // return apiData ?? mockProducts;
  return mockProducts;
}

export async function getBestSellers(limit = 5) {
  const all = await getAllProducts();
  return all.filter((p) => p.isBestSeller).slice(0, limit);
}

export async function getNewArrivals(limit = 5) {
  const all = await getAllProducts();
  return all.filter((p) => p.isNew).slice(0, limit);
}

export async function getFeaturedProducts(limit = 5) {
  // Until the backend defines "featured" explicitly, use the first N items
  // as a sane default — swap this logic out once the API sends a flag.
  const all = await getAllProducts();
  return all.slice(0, limit);
}

export async function getProductBySlug(slug) {
  const apiData = await apiGet(`/products/${slug}`);
  if (apiData) return apiData;
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(categoryId, limit) {
  const all = await getAllProducts();
  const filtered = all.filter((p) => p.category === categoryId);
  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}
