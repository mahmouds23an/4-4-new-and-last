"use client";
// app/orders/page.js — /orders: order history for the signed-in user.
// Pulls from services/orders.js, which currently falls back to mock data
// (see that file) until the orders endpoint is wired up on the backend —
// swapping that service to hit the real API is a drop-in, no change needed
// here.

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Package, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { getOrders } from "@/services/orders";
import mockProducts from "@/data/products";
import RequireAuth from "@/components/RequireAuth";

const STATUS_LABEL = {
  received: { en: "Received", ar: "تم الاستلام" },
  processing: { en: "Processing", ar: "قيد التجهيز" },
  packed: { en: "Packed", ar: "تم التغليف" },
  shipped: { en: "Shipped", ar: "تم الشحن" },
  delivered: { en: "Delivered", ar: "تم التوصيل" },
};

function productName(productId, lang) {
  const product = mockProducts.find((p) => p.id === productId);
  return product ? product.name[lang] : productId;
}

function OrdersContent() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getOrders(user.id).then((data) => {
      if (!cancelled) setOrders(data);
    });
    return () => {
      cancelled = true;
    };
  }, [user.id]);

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-white">
          {lang === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <ChevronRight size={12} data-flip-rtl="true" />
        <span className="text-white">
          {lang === "ar" ? "طلباتي" : "My Orders"}
        </span>
      </nav>

      <h1 className="mb-8 font-display text-2xl font-bold text-white">
        {lang === "ar" ? "طلباتي" : "My Orders"}
      </h1>

      {orders === null ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader2 size={28} className="animate-spin text-orange" />
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-md border border-graphite bg-charcoal py-16 text-center">
          <Package size={32} className="text-muted" />
          <p className="text-sm text-muted">
            {lang === "ar" ? "لا يوجد طلبات بعد" : "No orders yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-md border border-graphite bg-charcoal p-5"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-graphite pb-4">
                <div>
                  <p className="font-display text-sm font-semibold text-white">
                    {order.id}
                  </p>
                  <p className="text-xs text-muted">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                    {STATUS_LABEL[order.status]?.[lang] || order.status}
                  </span>
                  <span className="font-display text-sm font-bold text-white">
                    {order.total} {order.currency}
                  </span>
                </div>
              </div>
              <ul className="space-y-1.5">
                {order.items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex items-center justify-between text-sm text-muted"
                  >
                    <span>
                      {productName(item.productId, lang)} × {item.quantity}
                    </span>
                    <span>{item.price} {order.currency}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <RequireAuth>
      <OrdersContent />
    </RequireAuth>
  );
}
