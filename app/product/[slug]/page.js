// app/product/[slug]/page.js — Product detail page (server component)

import { getAllProducts, getProductBySlug } from "@/services/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name.en,
    description: `Shop ${product.name.en} by ${product.brand}. Premium off-road gear.`,
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const [product, allProducts] = await Promise.all([
    getProductBySlug(params.slug),
    getAllProducts(),
  ]);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
