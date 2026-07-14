"use client";
// app/wishlist/page.js — Wishlist page (frontend demo, localStorage-backed)

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import PlaceholderArt from "@/components/PlaceholderArt";
import RequireAuth from "@/components/RequireAuth";
import mockProducts from "@/data/products";

function WishlistContent() {
  const { lang, t } = useLanguage();
  const { addItem } = useCart();
  // Demo: use first 3 products as pre-saved wishlist items
  const [items, setItems] = useState([]);
  useEffect(() => { setItems(mockProducts.slice(0, 3)); }, []);

  const remove = (id) => setItems((p) => p.filter((i) => i.id !== id));

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-white">{lang === "ar" ? "الرئيسية" : "Home"}</Link>
        <ChevronRight size={12} data-flip-rtl="true" />
        <span className="text-white">{lang === "ar" ? "المفضلة" : "Wishlist"}</span>
      </nav>

      <div className="mb-8 flex items-center gap-3">
        <Heart size={24} className="text-orange" fill="var(--color-orange)" />
        <h1 className="font-display text-2xl font-bold text-white">
          {lang === "ar" ? "المفضلة" : "My Wishlist"}
        </h1>
        {items.length > 0 && (
          <span className="rounded-full bg-orange px-2.5 py-0.5 text-xs font-bold text-white">
            {items.length}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-24 text-center">
          <Heart size={56} className="text-graphite-light" strokeWidth={1} />
          <p className="text-muted">{lang === "ar" ? "قائمة المفضلة فارغة" : "Your wishlist is empty"}</p>
          <Link href="/products"
            className="rounded-md bg-orange px-6 py-3 font-display font-semibold text-white hover:bg-orange-dark">
            {lang === "ar" ? "تصفح المنتجات" : "Browse Products"}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {items.map((p) => (
              <motion.div key={p.id} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-graphite bg-charcoal hover:border-orange/40">
                {/* Remove */}
                <button onClick={() => remove(p.id)}
                  className="absolute end-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-muted backdrop-blur transition-all hover:text-orange"
                  aria-label="Remove">
                  <Trash2 size={14} />
                </button>
                <Link href={`/product/${p.slug}`} className="block overflow-hidden">
                  <PlaceholderArt icon={p.icon ?? "Gauge"} accent={p.accent ?? "orange"}
                    label={p.name[lang]}
                    className="aspect-square w-full transition-transform duration-500 group-hover:scale-105" dense />
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-orange">{p.brand}</p>
                  <Link href={`/product/${p.slug}`}>
                    <h3 className="line-clamp-2 text-sm font-medium text-white hover:text-orange">{p.name[lang]}</h3>
                  </Link>
                  <div className="mt-auto flex items-baseline gap-2">
                    <span className="font-display text-lg font-bold text-white">
                      {p.price.toLocaleString()} {t.product.sar}
                    </span>
                    {p.compareAtPrice && (
                      <span className="text-xs text-muted line-through">{p.compareAtPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button
                    onClick={() => { addItem({ ...p, qty: 1 }); remove(p.id); }}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-orange py-2.5 text-sm font-semibold text-white hover:bg-orange-dark">
                    <ShoppingCart size={14} />
                    {t.product.addToCart}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default function WishlistPage() {
  return (
    <RequireAuth>
      <WishlistContent />
    </RequireAuth>
  );
}
