"use client";

// ProductDetailClient.jsx  (app/product/[slug]/ProductDetailClient.jsx)
// What this is: the interactive product detail page.
// Sections: art gallery tabs · brand/name/price/badges ·
//           sticky Add-to-Cart · star rating · specs table ·
//           related products row.

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, ShoppingCart, Heart, Check, Truck, ShieldCheck,
  RotateCcw, ChevronRight, Minus, Plus,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import PlaceholderArt from "@/components/PlaceholderArt";
import ProductCard from "@/components/ProductCard";

// Mock specs — in production these come from the product object itself
function buildSpecs(product, lang) {
  return [
    { label: lang === "ar" ? "العلامة التجارية" : "Brand",    value: product.brand },
    { label: lang === "ar" ? "الفئة"            : "Category", value: product.category.replace("-", " ") },
    { label: lang === "ar" ? "الحالة"           : "Status",   value: product.inStock ? (lang === "ar" ? "متوفر" : "In Stock") : (lang === "ar" ? "غير متوفر" : "Out of Stock") },
    { label: lang === "ar" ? "التقييم"          : "Rating",   value: `${product.rating} / 5 (${product.reviewsCount} ${lang === "ar" ? "تقييم" : "reviews"})` },
  ];
}

export default function ProductDetailClient({ product, related }) {
  const { t, lang } = useLanguage();
  const { addItem } = useCart();
  const [qty,   setQty]   = useState(1);
  const [added, setAdded] = useState(false);
  const [tab,   setTab]   = useState("specs");

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem({ ...product, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const specs = buildSpecs(product, lang);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-6">

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-white">{lang === "ar" ? "الرئيسية" : "Home"}</Link>
        <ChevronRight size={12} data-flip-rtl="true" />
        <Link href="/products" className="hover:text-white">{lang === "ar" ? "المنتجات" : "Products"}</Link>
        <ChevronRight size={12} data-flip-rtl="true" />
        <span className="text-white">{product.name[lang]}</span>
      </nav>

      {/* Main grid */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

        {/* ── Left: Gallery ── */}
        <div className="space-y-3">
          {/* Main art */}
          <div className="overflow-hidden rounded-2xl border border-graphite">
            <PlaceholderArt
              icon={product.icon ?? "Gauge"}
              accent={product.accent ?? "orange"}
              label={product.name[lang]}
              className="aspect-square w-full"
            />
          </div>
          {/* Thumbnails (3 tinted variants as stand-ins) */}
          <div className="grid grid-cols-4 gap-2">
            {["orange", "amber", "graphite", "charcoal"].map((a, i) => (
              <button key={i}
                className={`overflow-hidden rounded-lg border-2 transition-colors ${i === 0 ? "border-orange" : "border-graphite hover:border-orange/60"}`}>
                <PlaceholderArt icon={product.icon ?? "Gauge"} accent={a}
                  className="aspect-square w-full" dense />
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Info ── */}
        <div className="flex flex-col gap-5">
          {/* Brand */}
          <p className="text-xs font-bold uppercase tracking-widest text-orange">{product.brand}</p>

          {/* Name */}
          <h1 className="font-display text-2xl font-bold leading-snug text-white md:text-3xl">
            {product.name[lang]}
          </h1>

          {/* Stars */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16}
                  fill={i < Math.floor(product.rating) ? "var(--color-amber)" : "none"}
                  className={i < Math.floor(product.rating) ? "text-amber" : "text-graphite-light"} />
              ))}
            </div>
            <span className="text-sm text-muted">{product.rating} ({product.reviewsCount} {t.product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-white">
              {product.price.toLocaleString()} {t.product.sar}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-muted line-through">
                {product.compareAtPrice.toLocaleString()}
              </span>
            )}
            {discount && (
              <span className="rounded bg-orange px-2 py-0.5 text-sm font-bold text-white">
                -{discount}%
              </span>
            )}
          </div>

          {/* Stock badge */}
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-sm font-medium text-white">
              {product.inStock
                ? (lang === "ar" ? "متوفر في المخزن" : "In Stock — Ready to Ship")
                : t.product.outOfStock}
            </span>
          </div>

          {/* Qty + Add to cart */}
          <div className="flex items-center gap-3">
            {/* Qty */}
            <div className="flex items-center rounded-md border border-graphite">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center text-muted transition-colors hover:text-white">
                <Minus size={16} />
              </button>
              <span className="min-w-[36px] text-center text-base font-semibold text-white">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}
                className="flex h-12 w-12 items-center justify-center text-muted transition-colors hover:text-white">
                <Plus size={16} />
              </button>
            </div>

            {/* Add to cart */}
            <AnimatePresence mode="wait">
              <motion.button key={added ? "done" : "idle"}
                initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}
                onClick={handleAdd} disabled={!product.inStock}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-3.5 font-display font-semibold text-white transition-colors disabled:opacity-40
                  ${added ? "bg-green-600" : "bg-orange hover:bg-orange-dark"}`}>
                {added
                  ? <><Check size={18} />{lang === "ar" ? "تمت الإضافة!" : "Added to Cart!"}</>
                  : <><ShoppingCart size={18} />{t.product.addToCart}</>}
              </motion.button>
            </AnimatePresence>

            {/* Wishlist */}
            <button aria-label="Wishlist"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-graphite text-muted transition-all hover:border-orange hover:text-orange">
              <Heart size={20} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 rounded-xl border border-graphite bg-charcoal p-4">
            {[
              { Icon: Truck,        en: "Fast Shipping",    ar: "شحن سريع"       },
              { Icon: ShieldCheck,  en: "100% Genuine",     ar: "أصلي 100%"      },
              { Icon: RotateCcw,    en: "Easy Returns",     ar: "إرجاع سهل"      },
            ].map(({ Icon, en, ar }) => (
              <div key={en} className="flex flex-col items-center gap-1.5 text-center">
                <Icon size={20} className="text-orange" strokeWidth={1.5} />
                <span className="text-[11px] text-muted">{lang === "ar" ? ar : en}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs: Specs / Description / Reviews ── */}
      <div className="mt-14">
        <div className="flex border-b border-graphite">
          {["specs", "description", "reviews"].map((key) => {
            const labels = {
              specs:       { en: "Specifications", ar: "المواصفات"    },
              description: { en: "Description",    ar: "الوصف"         },
              reviews:     { en: "Reviews",        ar: "التقييمات"    },
            };
            return (
              <button key={key} onClick={() => setTab(key)}
                className={`relative px-5 py-3 font-display text-sm font-semibold uppercase tracking-wide transition-colors
                  ${tab === key ? "text-orange" : "text-muted hover:text-white"}`}>
                {labels[key][lang]}
                {tab === key && (
                  <motion.div layoutId="tab-underline"
                    className="absolute bottom-0 start-0 end-0 h-[2px] bg-orange" />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="py-8">
            {tab === "specs" && (
              <table className="w-full max-w-xl">
                <tbody>
                  {specs.map((s, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-charcoal" : "bg-black"}>
                      <td className="rounded-s-lg px-4 py-3 text-sm font-medium text-muted">{s.label}</td>
                      <td className="rounded-e-lg px-4 py-3 text-sm font-medium text-white capitalize">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "description" && (
              <p className="max-w-2xl leading-relaxed text-muted">
                {lang === "ar"
                  ? `${product.name.ar} من ${product.brand} — قطعة أصلية عالية الجودة مصممة لأقسى الظروف الوعرة. مثالية لتحسين أداء سيارتك خارج الطرق المعبدة.`
                  : `The ${product.name.en} by ${product.brand} is a premium, genuine part built to handle the toughest off-road conditions. Engineered for reliability, performance, and long service life on the trail.`}
              </p>
            )}
            {tab === "reviews" && (
              <div className="space-y-4 max-w-2xl">
                {[5, 4, 5].map((rating, i) => (
                  <div key={i} className="rounded-xl border border-graphite bg-charcoal p-5">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-orange/20 font-display text-sm font-bold text-orange">
                        {["A", "K", "S"][i]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {["Ahmed Al-Otaibi", "Khalid M.", "Sara A."][i]}
                        </p>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, si) => (
                            <Star key={si} size={11}
                              fill={si < rating ? "var(--color-amber)" : "none"}
                              className={si < rating ? "text-amber" : "text-graphite-light"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted">
                      {lang === "ar"
                        ? "منتج ممتاز، وصل بسرعة وكان مطابقاً للوصف تماماً. أنصح به بشدة."
                        : "Excellent product, arrived fast and exactly as described. Highly recommended for any off-road build."}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <div className="mt-10 border-t border-graphite pt-10">
          <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wide text-white">
            {lang === "ar" ? "منتجات ذات صلة" : "Related Products"}
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
