"use client";
// ProductCard.jsx — product card with live Add to Cart via CartContext

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import PlaceholderArt from "./PlaceholderArt";
import Image from "next/image";

export default function ProductCard({ product, index = 0 }) {
  const { t, lang } = useLanguage();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const {
    id,
    slug,
    name,
    brand,
    price,
    compareAtPrice,
    rating,
    reviewsCount,
    inStock,
    isNew,
    accent,
    icon,
    image,
  } = product;

  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  const handleAdd = () => {
    if (!inStock) return;
    addItem({ id, name, brand, price, icon, accent, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.42, delay: index * 0.06, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-graphite bg-charcoal transition-all hover:border-orange/40 hover:shadow-xl"
    >
      {/* Badges */}
      <div className="absolute inset-s-3 top-3 z-10 flex flex-col gap-1.5">
        {discount && (
          <span className="rounded bg-orange px-2 py-0.5 text-[11px] font-bold text-white">
            -{discount}%
          </span>
        )}
        {isNew && (
          <span
            className="rounded px-2 py-0.5 text-[11px] font-bold text-black"
            style={{ background: "var(--color-amber)" }}
          >
            {t.product.new}
          </span>
        )}
      </div>

      {/* Art */}
      <Link href={`/product/${slug}`} className="block overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name[lang]}
            width={300}
            height={300}
            className="aspect-square w-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderArt
            icon={icon ?? "Gauge"}
            accent={accent ?? "orange"}
            label={name[lang]}
            className="aspect-square w-full transition-transform duration-500 group-hover:scale-105"
            dense
          />
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-orange">
          {brand}
        </p>
        <Link href={`/product/${slug}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-white transition-colors hover:text-orange">
            {name[lang]}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < Math.floor(rating) ? "text-amber" : "text-graphite-light"
                }
                fill={i < Math.floor(rating) ? "var(--color-amber)" : "none"}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted">({reviewsCount})</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-display text-lg font-bold text-white">
            {price.toLocaleString()} {t.product.sar}
          </span>
          {compareAtPrice && (
            <span className="text-xs text-muted line-through">
              {compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <AnimatePresence mode="wait">
          <motion.button
            key={added ? "added" : "idle"}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            disabled={!inStock}
            onClick={handleAdd}
            className={`mt-1 flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40
              ${added ? "bg-green-600" : "bg-orange hover:bg-orange-dark"}`}
          >
            {added ? (
              <>
                <Check size={15} />
                {lang === "ar" ? "تمت الإضافة" : "Added!"}
              </>
            ) : !inStock ? (
              t.product.outOfStock
            ) : (
              <>
                <ShoppingCart size={15} />
                {t.product.addToCart}
              </>
            )}
          </motion.button>
        </AnimatePresence>

        {/* Add to wishlist */}
        <button
          disabled={!inStock}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-graphite-light py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:border-orange hover:text-orange"
        >
          <Heart size={15} />
          <span>{lang === "ar" ? "أضف الى المفضلة" : "Add to Wishlist"}</span>
          {t.product.addToWishlist}
        </button>
      </div>
    </motion.article>
  );
}
