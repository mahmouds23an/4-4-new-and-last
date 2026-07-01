"use client";

// ProductsClient.jsx  (app/products/ProductsClient.jsx)
// What this is: the interactive products listing page.
// Features: instant debounced search · category / brand / price / stock filters
// · sort (best sellers, new, price asc/desc) · responsive 2→4 col grid.
// All filtering is client-side for now (fast, no backend needed).
// When backend search is ready, swap the useMemo filter for an API call.

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";

const SORT_OPTIONS = {
  en: [
    { value: "default",    label: "Default"          },
    { value: "best",       label: "Best Sellers"      },
    { value: "new",        label: "Newest"            },
    { value: "price-asc",  label: "Price: Low → High" },
    { value: "price-desc", label: "Price: High → Low" },
  ],
  ar: [
    { value: "default",    label: "الافتراضي"         },
    { value: "best",       label: "الأكثر مبيعاً"    },
    { value: "new",        label: "الأحدث"            },
    { value: "price-asc",  label: "السعر: من الأقل"  },
    { value: "price-desc", label: "السعر: من الأعلى" },
  ],
};

export default function ProductsClient({ allProducts, categories, brands, initialFilter, initialCategory }) {
  const { t, lang } = useLanguage();

  const [query,          setQuery]         = useState("");
  const [debounced,      setDebounced]     = useState("");
  const [sort,           setSort]          = useState(initialFilter === "best-sellers" ? "best" : initialFilter === "new" ? "new" : "default");
  const [selCategory,    setSelCategory]   = useState(initialCategory);
  const [selBrand,       setSelBrand]      = useState("");
  const [maxPrice,       setMaxPrice]      = useState(5000);
  const [inStockOnly,    setInStockOnly]   = useState(false);
  const [sidebarOpen,    setSidebarOpen]   = useState(false);

  // Debounce search
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(id);
  }, [query]);

  const maxPriceInData = useMemo(
    () => Math.max(...allProducts.map((p) => p.compareAtPrice ?? p.price)),
    [allProducts]
  );

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (debounced.trim()) {
      const q = debounced.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.ar.includes(debounced) ||
          p.brand.toLowerCase().includes(q)
      );
    }
    if (selCategory) list = list.filter((p) => p.category === selCategory);
    if (selBrand)    list = list.filter((p) => p.brand === selBrand);
    if (inStockOnly) list = list.filter((p) => p.inStock);
    list = list.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "best":       list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      case "new":        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
    }
    return list;
  }, [allProducts, debounced, selCategory, selBrand, maxPrice, inStockOnly, sort]);

  const clearFilters = () => {
    setQuery(""); setSelCategory(""); setSelBrand("");
    setMaxPrice(maxPriceInData); setInStockOnly(false); setSort("default");
  };
  const hasFilters = selCategory || selBrand || inStockOnly || query;

  // ── Sidebar content ──────────────────────────────────────────────────────
  const Sidebar = () => (
    <aside className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-white">
          {lang === "ar" ? "الفئات" : "Categories"}
        </h3>
        <ul className="space-y-1">
          <li>
            <button onClick={() => setSelCategory("")}
              className={`w-full rounded-md px-3 py-2 text-start text-sm transition-colors ${!selCategory ? "bg-orange/15 font-semibold text-orange" : "text-muted hover:text-white"}`}>
              {lang === "ar" ? "الكل" : "All Categories"}
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button onClick={() => setSelCategory(c.id)}
                className={`w-full rounded-md px-3 py-2 text-start text-sm transition-colors ${selCategory === c.id ? "bg-orange/15 font-semibold text-orange" : "text-muted hover:text-white"}`}>
                {c.name[lang]}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-white">
          {lang === "ar" ? "العلامة التجارية" : "Brand"}
        </h3>
        <ul className="space-y-1">
          <li>
            <button onClick={() => setSelBrand("")}
              className={`w-full rounded-md px-3 py-2 text-start text-sm transition-colors ${!selBrand ? "bg-orange/15 font-semibold text-orange" : "text-muted hover:text-white"}`}>
              {lang === "ar" ? "الكل" : "All Brands"}
            </button>
          </li>
          {[...new Set(allProducts.map((p) => p.brand))].map((b) => (
            <li key={b}>
              <button onClick={() => setSelBrand(b)}
                className={`w-full rounded-md px-3 py-2 text-start text-sm transition-colors ${selBrand === b ? "bg-orange/15 font-semibold text-orange" : "text-muted hover:text-white"}`}>
                {b}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-white">
          {lang === "ar" ? "السعر" : "Max Price"}
        </h3>
        <input type="range" min={0} max={maxPriceInData} value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-orange" />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>0</span>
          <span className="font-semibold text-white">{maxPrice.toLocaleString()} {t.product.sar}</span>
          <span>{maxPriceInData.toLocaleString()}</span>
        </div>
      </div>

      {/* In stock */}
      <label className="flex cursor-pointer items-center gap-2.5">
        <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)}
          className="h-4 w-4 accent-orange" />
        <span className="text-sm text-muted">{lang === "ar" ? "متوفر فقط" : "In Stock Only"}</span>
      </label>

      {hasFilters && (
        <button onClick={clearFilters}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-orange/30 py-2 text-sm text-orange hover:bg-orange/10">
          <X size={14} />
          {lang === "ar" ? "مسح الفلاتر" : "Clear Filters"}
        </button>
      )}
    </aside>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-6">
      {/* Page header */}
      <SectionHeader
        title={lang === "ar" ? "جميع المنتجات" : "All Products"}
        linkLabel={null}
      />

      {/* Search + sort bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder}
            className="w-full rounded-md border border-graphite bg-charcoal py-2.5 pe-4 ps-9 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Mobile filter toggle */}
        <button onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 rounded-md border border-graphite bg-charcoal px-4 py-2.5 text-sm text-white md:hidden">
          <SlidersHorizontal size={15} />
          {lang === "ar" ? "الفلاتر" : "Filters"}
        </button>

        {/* Sort */}
        <div className="relative">
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="appearance-none rounded-md border border-graphite bg-charcoal px-4 py-2.5 pe-8 text-sm text-white focus:border-orange focus:outline-none">
            {SORT_OPTIONS[lang].map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-muted" />
        </div>

        {/* Result count */}
        <p className="ms-auto text-sm text-muted">
          {filtered.length} {lang === "ar" ? "منتج" : "products"}
        </p>
      </div>

      {/* Layout: sidebar + grid */}
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden w-52 shrink-0 md:block lg:w-60">
          <Sidebar />
        </div>

        {/* Grid */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 py-24 text-center">
                <Search size={40} className="text-graphite-light" strokeWidth={1} />
                <p className="text-muted">
                  {lang === "ar" ? "لا توجد منتجات مطابقة" : "No products match your filters"}
                </p>
                <button onClick={clearFilters}
                  className="text-sm font-medium text-orange hover:underline">
                  {lang === "ar" ? "مسح الفلاتر" : "Clear filters"}
                </button>
              </motion.div>
            ) : (
              <motion.div key="grid"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ x: lang === "ar" ? "100%" : "-100%" }}
              animate={{ x: 0 }} exit={{ x: lang === "ar" ? "100%" : "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed inset-y-0 start-0 z-[70] w-72 overflow-y-auto bg-charcoal p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">
                  {lang === "ar" ? "الفلاتر" : "Filters"}
                </h3>
                <button onClick={() => setSidebarOpen(false)} className="text-muted hover:text-white">
                  <X size={22} />
                </button>
              </div>
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
