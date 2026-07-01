// reviews.js (service)
// What this is: data access point for customer testimonials shown on the
// homepage reviews section.

import { apiGet } from "./apiClient";
import mockReviews from "@/data/reviews";

export async function getReviews() {
  const apiData = await apiGet("/reviews");
  return apiData ?? mockReviews;
}
