// brands.js (service)
// What this is: data access point for brand logos/info, used by the
// homepage brands carousel and the future /brands page.

import { apiGet } from "./apiClient";
import mockBrands from "@/data/brands";

export async function getAllBrands() {
  // const apiData = await apiGet("/brands");
  // return apiData ?? mockBrands;
  return mockBrands;
}
