"use client";

// HomeClient.jsx
// What this is: the client-side assembly of all homepage sections. The server
// component (app/page.js) fetches the data and passes it here as props so we
// get server-rendered HTML for SEO while still using client interactivity
// (animations, language context, etc.) in every section component.

import HeroSlider from "./HeroSlider";
import CategoryGrid from "./CategoryGrid";
import ProductRow from "./ProductRow";
import BrandsCarousel from "./BrandsCarousel";
import WhyUsSection from "./WhyUsSection";
import ReviewsSection from "./ReviewsSection";
import NewsletterSection from "./NewsletterSection";

export default function HomeClient({ categories, bestSellers, featured, newArrivals, brands, reviews }) {
  return (
    <>
      <HeroSlider />
      <CategoryGrid categories={categories} />
      <ProductRow titleKey="featuredProducts" products={featured} viewAllHref="/products?filter=featured" />
      <WhyUsSection />
      <ProductRow titleKey="bestSellers" products={bestSellers} viewAllHref="/products?filter=best-sellers" />
      <BrandsCarousel brands={brands} />
      <ProductRow titleKey="newArrivals" products={newArrivals} viewAllHref="/products?filter=new" />
      <ReviewsSection reviews={reviews} />
      <NewsletterSection />
    </>
  );
}
