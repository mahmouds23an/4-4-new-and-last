"use client";

// ProductRow.jsx
// What this is: a reusable section that wraps a SectionHeader + a grid of
// ProductCards. Used for Best Sellers, Featured Products, New Arrivals on
// the homepage. The `products` array is passed in from the Home server
// component (which calls services/products.js with the API-first pattern).

import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProductRow({ titleKey, products, viewAllHref }) {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-360 px-4 pb-14 md:px-6 md:pb-20">
      <SectionHeader
        title={t.sections[titleKey]}
        linkLabel={t.sections.viewAll}
        linkHref={viewAllHref ?? "/products"}
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
