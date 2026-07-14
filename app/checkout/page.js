"use client";

// app/checkout/page.js
// What this is: multi-step checkout (Address → Shipping → Payment → Confirmation).
// All UI is functional frontend-only. When the backend is ready, wire the
// final "Place Order" button to POST /orders via services/orders.js.

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Truck, CreditCard, CheckCircle2,
  ChevronRight, ChevronLeft, Lock,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import PlaceholderArt from "@/components/PlaceholderArt";
import RequireAuth from "@/components/RequireAuth";

// ── Step definitions ────────────────────────────────────────────────────────
const STEPS = {
  en: ["Address", "Shipping", "Payment", "Confirmation"],
  ar: ["العنوان",  "الشحن",   "الدفع",   "التأكيد"],
};

const STEP_ICONS = [MapPin, Truck, CreditCard, CheckCircle2];

// ── Step 1: Address form ────────────────────────────────────────────────────
function StepAddress({ data, onChange, lang }) {
  const fields = [
    { key: "fullName",  type: "text",  en: "Full Name",    ar: "الاسم الكامل",           placeholder: { en: "Ahmed Al-Harbi", ar: "أحمد الحربي" } },
    { key: "phone",     type: "tel",   en: "Phone Number", ar: "رقم الجوال",              placeholder: { en: "+966 5X XXX XXXX", ar: "+966 5X XXX XXXX" } },
    { key: "city",      type: "text",  en: "City",         ar: "المدينة",                  placeholder: { en: "Riyadh", ar: "الرياض" } },
    { key: "district",  type: "text",  en: "District",     ar: "الحي",                     placeholder: { en: "Al Malaz", ar: "الملز" } },
    { key: "street",    type: "text",  en: "Street",       ar: "اسم الشارع",               placeholder: { en: "King Fahd Rd", ar: "طريق الملك فهد" } },
    { key: "building",  type: "text",  en: "Building No.", ar: "رقم المبنى",               placeholder: { en: "12A", ar: "12أ" } },
  ];
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-white">
        {lang === "ar" ? "عنوان التوصيل" : "Delivery Address"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className={f.key === "street" || f.key === "fullName" ? "sm:col-span-2" : ""}>
            <label className="mb-1.5 block text-sm font-medium text-muted">
              {lang === "ar" ? f.ar : f.en}
            </label>
            <input
              type={f.type}
              value={data[f.key] ?? ""}
              onChange={(e) => onChange(f.key, e.target.value)}
              placeholder={f.placeholder[lang]}
              className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted transition-colors focus:border-orange focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 2: Shipping method ─────────────────────────────────────────────────
function StepShipping({ selected, onSelect, lang }) {
  const options = [
    { id: "standard", en: "Standard Shipping", ar: "الشحن العادي",   days: { en: "3–5 business days", ar: "٣–٥ أيام عمل"  }, price: 49  },
    { id: "express",  en: "Express Shipping",  ar: "الشحن السريع",   days: { en: "1–2 business days", ar: "١–٢ يوم عمل"   }, price: 99  },
    { id: "same-day", en: "Same Day (Riyadh)", ar: "توصيل فوري (الرياض)", days: { en: "Today by 9 PM",ar: "اليوم قبل ٩م" }, price: 149 },
  ];
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-white">
        {lang === "ar" ? "طريقة الشحن" : "Shipping Method"}
      </h2>
      <div className="space-y-3">
        {options.map((o) => (
          <button key={o.id} onClick={() => onSelect(o)}
            className={`w-full flex items-center justify-between rounded-xl border p-4 text-start transition-all
              ${selected?.id === o.id ? "border-orange bg-orange/10" : "border-graphite bg-charcoal hover:border-orange/40"}`}>
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors
                ${selected?.id === o.id ? "border-orange" : "border-muted"}`}>
                {selected?.id === o.id && <div className="h-2 w-2 rounded-full bg-orange" />}
              </div>
              <div>
                <p className="font-medium text-white">{lang === "ar" ? o.ar : o.en}</p>
                <p className="text-xs text-muted">{o.days[lang]}</p>
              </div>
            </div>
            <span className="font-display font-bold text-orange">
              {o.price === 0 ? (lang === "ar" ? "مجاني" : "Free") : `${o.price} SAR`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 3: Payment ─────────────────────────────────────────────────────────
function StepPayment({ data, onChange, lang }) {
  const methods = [
    { id: "card",     en: "Credit / Debit Card", ar: "بطاقة بنكية"    },
    { id: "applepay", en: "Apple Pay",            ar: "Apple Pay"       },
    { id: "mada",     en: "Mada",                 ar: "مدى"            },
    { id: "stcpay",   en: "STC Pay",              ar: "STC Pay"         },
    { id: "cod",      en: "Cash on Delivery",     ar: "الدفع عند الاستلام" },
  ];

  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl font-bold text-white">
        {lang === "ar" ? "طريقة الدفع" : "Payment Method"}
      </h2>

      {/* Payment method selector */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {methods.map((m) => (
          <button key={m.id} onClick={() => onChange("method", m.id)}
            className={`rounded-xl border p-3 text-sm font-medium transition-all
              ${data.method === m.id ? "border-orange bg-orange/10 text-orange" : "border-graphite bg-charcoal text-muted hover:border-orange/40 hover:text-white"}`}>
            {lang === "ar" ? m.ar : m.en}
          </button>
        ))}
      </div>

      {/* Card form */}
      <AnimatePresence>
        {data.method === "card" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden">
            <div>
              <label className="mb-1.5 block text-sm text-muted">
                {lang === "ar" ? "رقم البطاقة" : "Card Number"}
              </label>
              <input type="text" maxLength={19} placeholder="1234 5678 9012 3456"
                value={data.cardNum ?? ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 16)
                    .replace(/(.{4})/g, "$1 ").trim();
                  onChange("cardNum", v);
                }}
                className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm text-muted">
                  {lang === "ar" ? "تاريخ الانتهاء" : "Expiry"}
                </label>
                <input type="text" placeholder="MM / YY" maxLength={7}
                  value={data.expiry ?? ""}
                  onChange={(e) => onChange("expiry", e.target.value)}
                  className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted">CVV</label>
                <input type="password" placeholder="•••" maxLength={4}
                  value={data.cvv ?? ""}
                  onChange={(e) => onChange("cvv", e.target.value)}
                  className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-muted">
                {lang === "ar" ? "اسم حامل البطاقة" : "Cardholder Name"}
              </label>
              <input type="text" placeholder={lang === "ar" ? "الاسم كما هو على البطاقة" : "Name on card"}
                value={data.cardName ?? ""}
                onChange={(e) => onChange("cardName", e.target.value)}
                className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none" />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-graphite/50 bg-black/40 px-3 py-2">
              <Lock size={13} className="text-green-400 shrink-0" />
              <span className="text-xs text-muted">
                {lang === "ar" ? "مدفوعاتك محمية بتشفير SSL 256-bit" : "Your payment is secured with 256-bit SSL encryption"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Step 4: Confirmation ────────────────────────────────────────────────────
function StepConfirmation({ lang, orderNum }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-5 py-10 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-green-500/15">
        <CheckCircle2 size={44} className="text-green-400" strokeWidth={1.5} />
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold text-white">
          {lang === "ar" ? "تم الطلب بنجاح! 🎉" : "Order Placed! 🎉"}
        </h2>
        <p className="mt-1 text-muted">
          {lang === "ar"
            ? `رقم الطلب: #${orderNum} — ستصلك رسالة تأكيد قريباً`
            : `Order #${orderNum} — A confirmation will be sent to your email`}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/products"
          className="rounded-md bg-orange px-6 py-3 font-display font-semibold text-white hover:bg-orange-dark">
          {lang === "ar" ? "متابعة التسوق" : "Continue Shopping"}
        </Link>
        <Link href="/"
          className="rounded-md border border-graphite px-6 py-3 font-display font-semibold text-white hover:border-orange hover:text-orange">
          {lang === "ar" ? "الرئيسية" : "Go Home"}
        </Link>
      </div>
    </motion.div>
  );
}

// ── Main Checkout component ─────────────────────────────────────────────────
function CheckoutContent() {
  const { lang, t } = useLanguage();
  const { items, total, clearCart } = useCart();

  const [step, setStep] = useState(0);
  const [address,  setAddress]  = useState({});
  const [shipping, setShipping] = useState(null);
  const [payment,  setPayment]  = useState({ method: "card" });
  const [orderNum, setOrderNum] = useState(null);
  const [placing,  setPlacing]  = useState(false);

  const shippingCost = shipping?.price ?? 49;
  const grandTotal   = total + shippingCost;

  const handleAddressChange  = (k, v) => setAddress((p) => ({ ...p, [k]: v }));
  const handlePaymentChange  = (k, v) => setPayment((p) => ({ ...p, [k]: v }));

  const canAdvance = () => {
    if (step === 0) return address.fullName && address.phone && address.city;
    if (step === 1) return !!shipping;
    if (step === 2) return !!payment.method;
    return true;
  };

  const placeOrder = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API
    const num = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNum(num);
    clearCart();
    setStep(3);
    setPlacing(false);
  };

  const stepContent = [
    <StepAddress  key="addr"  data={address}  onChange={handleAddressChange} lang={lang} />,
    <StepShipping key="ship"  selected={shipping} onSelect={setShipping}     lang={lang} />,
    <StepPayment  key="pay"   data={payment}  onChange={handlePaymentChange} lang={lang} />,
    <StepConfirmation key="done" lang={lang} orderNum={orderNum} />,
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-6">
      {/* Progress bar */}
      {step < 3 && (
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {STEPS[lang].map((label, i) => {
              const Icon = STEP_ICONS[i];
              const active = i === step;
              const done   = i < step;
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-all
                    ${done ? "border-green-500 bg-green-500/20" : active ? "border-orange bg-orange/20" : "border-graphite bg-charcoal"}`}>
                    <Icon size={18} className={done ? "text-green-400" : active ? "text-orange" : "text-muted"} />
                  </div>
                  <span className={`hidden text-[11px] font-medium sm:block ${active ? "text-orange" : done ? "text-green-400" : "text-muted"}`}>
                    {label}
                  </span>
                  {i < STEPS[lang].length - 1 && (
                    <div className={`absolute hidden h-[2px] w-[calc(100%/4-2.5rem)] translate-x-8 sm:block ${i < step ? "bg-green-500" : "bg-graphite"}`} />
                  )}
                </div>
              );
            })}
          </div>
          {/* connector line */}
          <div className="relative mt-5 h-[2px] bg-graphite">
            <motion.div className="absolute start-0 top-0 h-full bg-orange"
              animate={{ width: `${(step / (STEPS[lang].length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }} />
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Step content */}
        <div className="rounded-2xl border border-graphite bg-charcoal p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28 }}>
              {stepContent[step]}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          {step < 3 && (
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 rounded-md border border-graphite px-5 py-2.5 text-sm font-medium text-muted hover:border-orange hover:text-white">
                  <ChevronLeft size={16} data-flip-rtl="true" />
                  {lang === "ar" ? "السابق" : "Back"}
                </button>
              ) : (
                <Link href="/cart"
                  className="flex items-center gap-2 rounded-md border border-graphite px-5 py-2.5 text-sm font-medium text-muted hover:border-orange hover:text-white">
                  <ChevronLeft size={16} data-flip-rtl="true" />
                  {lang === "ar" ? "السلة" : "Back to Cart"}
                </Link>
              )}

              {step < 2 ? (
                <button onClick={() => setStep((s) => s + 1)} disabled={!canAdvance()}
                  className="flex items-center gap-2 rounded-md bg-orange px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-dark disabled:opacity-40">
                  {lang === "ar" ? "التالي" : "Continue"}
                  <ChevronRight size={16} data-flip-rtl="true" />
                </button>
              ) : (
                <button onClick={placeOrder} disabled={!canAdvance() || placing}
                  className="flex items-center gap-2 rounded-md bg-orange px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-dark disabled:opacity-40">
                  {placing ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {lang === "ar" ? "جاري التأكيد..." : "Placing order..."}
                    </span>
                  ) : (
                    <>
                      <Lock size={15} />
                      {lang === "ar" ? "تأكيد الطلب" : "Place Order"}
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        {step < 3 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-graphite bg-charcoal p-5">
              <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-white">
                {lang === "ar" ? "ملخص الطلب" : "Order Summary"}
              </h3>

              {/* Items */}
              <div className="mb-4 space-y-3 border-b border-graphite pb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                      <PlaceholderArt icon={item.icon ?? "Gauge"} accent={item.accent ?? "orange"}
                        className="h-full w-full" dense />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1 text-xs font-medium text-white">{item.name[lang]}</p>
                      <p className="text-[11px] text-muted">× {item.qty}</p>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">{lang === "ar" ? "الإجمالي الفرعي" : "Subtotal"}</span>
                  <span className="text-white">{total.toLocaleString()} {t.product.sar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">{lang === "ar" ? "الشحن" : "Shipping"}</span>
                  <span className="text-white">{shippingCost} {t.product.sar}</span>
                </div>
                <div className="flex justify-between border-t border-graphite pt-2 font-bold">
                  <span className="text-white">{lang === "ar" ? "الإجمالي" : "Total"}</span>
                  <span className="font-display text-lg text-orange">
                    {grandTotal.toLocaleString()} {t.product.sar}
                  </span>
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 rounded-xl border border-graphite bg-charcoal px-4 py-3">
              <Lock size={14} className="text-green-400 shrink-0" />
              <span className="text-xs text-muted">
                {lang === "ar" ? "معاملاتك آمنة ومشفرة" : "Your transaction is secure & encrypted"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutContent />
    </RequireAuth>
  );
}
