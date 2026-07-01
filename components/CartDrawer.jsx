"use client";

// CartDrawer.jsx
// What this is: the slide-in side cart opened from the cart icon in the header.
// Shows all cart items, quantity controls, subtotal, and a "Checkout" CTA.
// Reads/writes via CartContext — no backend needed yet.

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import PlaceholderArt from "./PlaceholderArt";
import Image from "next/image";

export default function CartDrawer({ open, onClose }) {
  const { t, lang } = useLanguage();
  const { items, count, total, removeItem, updateQty } = useCart();

  // Lock body scroll while open
  if (typeof document !== "undefined") {
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = open ? "hidden" : "";
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: lang === "ar" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: lang === "ar" ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed inset-y-0 end-0 z-[70] flex w-full max-w-sm flex-col bg-charcoal shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-graphite px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-orange" />
                <h2 className="font-display text-lg font-bold text-white">
                  {lang === "ar" ? "سلة التسوق" : "Your Cart"}
                  {count > 0 && (
                    <span className="ms-2 rounded-full bg-orange px-2 py-0.5 text-xs font-bold text-white">
                      {count}
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-muted hover:text-white"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                  <ShoppingBag
                    size={48}
                    className="text-graphite-light"
                    strokeWidth={1}
                  />
                  <p className="text-sm text-muted">
                    {lang === "ar" ? "سلتك فارغة" : "Your cart is empty"}
                  </p>
                  <button
                    onClick={onClose}
                    className="rounded-md bg-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-dark"
                  >
                    {lang === "ar" ? "تسوق الآن" : "Start Shopping"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3 rounded-xl border border-graphite bg-black p-3"
                      >
                        {/* Thumbnail */}
                        {item.image ? (
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-graphite">
                            <Image
                              src={item.image}
                              alt={item.name[lang]}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-graphite">
                            <PlaceholderArt />
                          </div>
                        )}
                        {/* Info */}
                        <div className="flex flex-1 flex-col justify-between gap-1 min-w-0">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-orange">
                              {item.brand}
                            </p>
                            <p className="line-clamp-2 text-xs font-medium text-white">
                              {item.name[lang]}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            {/* Qty controls */}
                            <div className="flex items-center gap-2 rounded-md border border-graphite">
                              <button
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:text-white"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="min-w-[20px] text-center text-sm font-medium text-white">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:text-white"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            {/* Price */}
                            <span className="font-display text-sm font-bold text-white">
                              {(item.price * item.qty).toLocaleString()}{" "}
                              {t.product.sar}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="self-start text-muted transition-colors hover:text-orange"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer: total + CTA */}
            {items.length > 0 && (
              <div className="border-t border-graphite px-5 py-5 space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">
                    {lang === "ar" ? "الإجمالي الفرعي" : "Subtotal"}
                  </span>
                  <span className="font-display text-lg font-bold text-white">
                    {total.toLocaleString()} {t.product.sar}
                  </span>
                </div>
                <p className="text-[11px] text-muted">
                  {lang === "ar"
                    ? "الشحن والضريبة تُحسب عند الدفع"
                    : "Shipping & taxes calculated at checkout"}
                </p>

                {/* Checkout button */}
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-orange py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
                >
                  {lang === "ar" ? "إتمام الشراء" : "Proceed to Checkout"}
                  <ArrowRight size={16} data-flip-rtl="true" />
                </Link>

                {/* View cart link */}
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="block w-full rounded-md border border-graphite py-2.5 text-center text-sm font-medium text-muted transition-colors hover:border-orange hover:text-white"
                >
                  {lang === "ar" ? "عرض السلة" : "View Full Cart"}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
