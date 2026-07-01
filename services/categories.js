// categories.js (service)
// What this is: data access point for category/subcategory data, used by
// the homepage category grid and the header mega menu. API-first with a
// mock fallback — see apiClient.js for the contract.

import { apiGet } from "./apiClient";
import mockCategories from "@/data/categories";

export async function getAllCategories() {
  const apiData = await apiGet("/categories");
  return apiData ?? mockCategories;
}

export async function getCategoryBySlug(slug) {
  const all = await getAllCategories();
  return all.find((c) => c.slug === slug) ?? null;
}
