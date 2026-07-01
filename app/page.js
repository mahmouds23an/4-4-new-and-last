// app/page.js  (Home page - server component)
// What this is: the homepage route. Runs on the server so all data fetching
// (services/ calls) happens before HTML is sent to the browser — no loading
// states needed for the initial render. Passes fetched data down to the
// client components that need it. Falls back to mock data automatically when
// NEXT_PUBLIC_API_URL is empty (see services/apiClient.js).

import { getAllCategories } from "@/services/categories";
import { getBestSellers, getFeaturedProducts, getNewArrivals } from "@/services/products";
import { getAllBrands } from "@/services/brands";
import { getReviews } from "@/services/reviews";
import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "4x4 Center | Premium Off-Road & Overlanding Gear",
  description:
    "Shop premium off-road lighting, suspension, recovery gear and overlanding equipment from the world's top 4x4 brands. Free shipping on orders over 1000 SAR.",
  openGraph: {
    title: "4x4 Center | Premium Off-Road & Overlanding Gear",
    description: "Shop premium off-road equipment from top brands. Free shipping on orders over 1000 SAR.",
  },
};

export default async function HomePage() {
  // All of these fall back to /data/*.js if the API is unreachable
  const [categories, bestSellers, featured, newArrivals, brands, reviews] = await Promise.all([
    getAllCategories(),
    getBestSellers(5),
    getFeaturedProducts(5),
    getNewArrivals(5),
    getAllBrands(),
    getReviews(),
  ]);

  return (
    <HomeClient
      categories={categories}
      bestSellers={bestSellers}
      featured={featured}
      newArrivals={newArrivals}
      brands={brands}
      reviews={reviews}
    />
  );
}
