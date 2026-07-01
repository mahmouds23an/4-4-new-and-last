"use client";

// app/cart/page.js
// What this is: the full /cart page (not the drawer). Shows all cart items,
// qty controls, coupon input, shipping estimate UI, and order summary.

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, Minus, Trash2, Tag, Truck, ArrowRight, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import PlaceholderArt from "@/components/PlaceholderArt";

export default function CartPage() {
  const { t, lang } = useLanguage();
  const { items, total, removeItem, updateQty, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponErr, setCouponErr] = useState(false);

  const shipping = total > 1000 ? 0 : 49;
  const discount = couponApplied ? Math.round(total * 0.1) : 0;
  const grandTotal = total - discount + shipping;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "4X4CENTER") {
      setCouponApplied(true); setCouponErr(false);
    } else {
      setCouponErr(true); setCouponApplied(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-6 px-4 py-32 text-center">
        <ShoppingBag size={64} className="text-graphite-light" strokeWidth={1} />
        <h1 className="font-display text-2xl font-bold text-white">
          {lang === "ar" ? "سلتك فارغة" : "Your cart is empty"}
        </h1>
        <p className="text-muted">
          {lang === "ar" ? "ابدأ التسوق واضف منتجاتك المفضلة" : "Start shopping and add your favourite items"}
        </p>
        <Link href="/products"
          className="inline-flex items-center gap-2 rounded-md bg-orange px-6 py-3 font-display font-semibold text-white hover:bg-orange-dark">
          {lang === "ar" ? "تسوق الآن" : "Shop Now"}
          <ArrowRight size={16} data-flip-rtl="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-white">{lang === "ar" ? "الرئيسية" : "Home"}</Link>
        <ChevronRight size={12} data-flip-rtl="true" />
        <span className="text-white">{lang === "ar" ? "السلة" : "Cart"}</span>
      </nav>

      <h1 className="mb-8 font-display text-2xl font-bold text-white">
        {lang === "ar" ? "سلة التسوق" : "Shopping Cart"}
        <span className="ms-2 font-display text-base font-normal text-muted">
          ({items.length} {lang === "ar" ? "عنصر" : "items"})
        </span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

        {/* ── Items list ── */}
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div key={item.id}
                layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40, height: 0 }} transition={{ duration: 0.28 }}
                className="flex gap-4 rounded-xl border border-graphite bg-charcoal p-4">
                {/* Thumb */}
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                  <PlaceholderArt icon={item.icon ?? "Gauge"} accent={item.accent ?? "orange"}
                    className="h-full w-full" dense />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-orange">{item.brand}</p>
                    <p className="line-clamp-2 text-sm font-medium text-white">{item.name[lang]}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* Qty */}
                    <div className="flex items-center rounded-md border border-graphite">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}
                        className="flex h-8 w-8 items-center justify-center text-muted hover:text-white">
                        <Minus size={13} />
                      </button>
                      <span className="min-w-[28px] text-center text-sm font-semibold text-white">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}
                        className="flex h-8 w-8 items-center justify-center text-muted hover:text-white">
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-display text-lg font-bold text-white">
                      {(item.price * item.qty).toLocaleString()} {t.product.sar}
                    </span>

                    {/* Remove */}
                    <button onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-orange">
                      <Trash2 size={13} />
                      {lang === "ar" ? "حذف" : "Remove"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Clear cart */}
          <button onClick={clearCart}
            className="text-xs text-muted hover:text-orange transition-colors">
            {lang === "ar" ? "مسح السلة" : "Clear cart"}
          </button>
        </div>

        {/* ── Order summary ── */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="rounded-xl border border-graphite bg-charcoal p-5">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase text-white">
              <Tag size={15} className="text-orange" />
              {lang === "ar" ? "كود الخصم" : "Coupon Code"}
            </h3>
            <div className="flex gap-2">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                placeholder={lang === "ar" ? "أدخل الكود" : "Enter code"}
                className="flex-1 rounded-md border border-graphite bg-black px-3 py-2.5 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none" />
              <button onClick={applyCoupon}
                className="rounded-md bg-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-dark">
                {lang === "ar" ? "تطبيق" : "Apply"}
              </button>
            </div>
            {couponApplied && (
              <p className="mt-2 text-xs text-green-400">
                {lang === "ar" ? "✓ تم تطبيق خصم 10%" : "✓ 10% discount applied!"}
              </p>
            )}
            {couponErr && (
              <p className="mt-2 text-xs text-orange">
                {lang === "ar" ? "كود غير صحيح. جرّب: 4X4CENTER" : "Invalid code. Try: 4X4CENTER"}
              </p>
            )}
          </div>

          {/* Shipping estimate */}
          <div className="rounded-xl border border-graphite bg-charcoal p-5">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase text-white">
              <Truck size={15} className="text-orange" />
              {lang === "ar" ? "تقدير الشحن" : "Shipping Estimate"}
            </h3>
            {shipping === 0
              ? <p className="text-sm text-green-400">{lang === "ar" ? "✓ شحن مجاني لطلبك!" : "✓ Free shipping on your order!"}</p>
              : <p className="text-sm text-muted">{lang === "ar" ? `رسوم الشحن: ${shipping} ريال` : `Shipping fee: ${shipping} SAR`}</p>}
          </div>

          {/* Summary */}
          <div className="rounded-xl border border-graphite bg-charcoal p-5 space-y-3">
            <h3 className="font-display text-sm font-bold uppercase text-white">
              {lang === "ar" ? "ملخص الطلب" : "Order Summary"}
            </h3>
            {[
              { label: lang === "ar" ? "الإجمالي الفرعي" : "Subtotal", value: total },
              ...(discount ? [{ label: lang === "ar" ? "الخصم" : "Discount", value: -discount }] : []),
              { label: lang === "ar" ? "الشحن" : "Shipping", value: shipping },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted">{label}</span>
                <span className={`font-medium ${value < 0 ? "text-green-400" : "text-white"}`}>
                  {value < 0 ? "-" : ""}{Math.abs(value).toLocaleString()} {t.product.sar}
                </span>
              </div>
            ))}
            <div className="border-t border-graphite pt-3 flex justify-between">
              <span className="font-display font-bold text-white">{lang === "ar" ? "الإجمالي" : "Total"}</span>
              <span className="font-display text-xl font-bold text-orange">
                {grandTotal.toLocaleString()} {t.product.sar}
              </span>
            </div>

            <Link href="/checkout"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-orange py-3.5 font-display font-semibold text-white hover:bg-orange-dark">
              {lang === "ar" ? "إتمام الشراء" : "Proceed to Checkout"}
              <ArrowRight size={16} data-flip-rtl="true" />
            </Link>
            <Link href="/products"
              className="block w-full text-center text-sm text-muted hover:text-white transition-colors">
              {lang === "ar" ? "← متابعة التسوق" : "← Continue Shopping"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
