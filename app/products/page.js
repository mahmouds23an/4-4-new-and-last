// app/products/page.js — Products listing page (server component for data + SEO)

import { getAllProducts } from "@/services/products";
import { getAllCategories } from "@/services/categories";
import { getAllBrands } from "@/services/brands";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "All Products | 4x4 Center",
  description: "Browse our full range of premium off-road and overlanding gear — lighting, suspension, tires, recovery equipment and more.",
};

export default async function ProductsPage({ searchParams }) {
  const [products, categories, brands] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllBrands(),
  ]);

  return (
    <ProductsClient
      allProducts={products}
      categories={categories}
      brands={brands}
      initialFilter={searchParams?.filter ?? ""}
      initialCategory={searchParams?.category ?? ""}
    />
  );
}
