"use client";

// SearchOverlay.jsx
// What this is: the full-screen search experience opened from the header
// search icon. Debounces user input (250ms) and instantly filters the mock
// product catalog client-side — once the backend exists, swap the local
// `.filter()` below for a call to a debounced `/search?q=` service without
// touching the rest of this component.

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import products from "@/data/products";

const TRENDING = ["LED Light Bar", "Lift Kit", "Winch", "Roof Tent"];

export default function SearchOverlay({ open, onClose }) {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    if (!debounced.trim()) return [];
    const q = debounced.trim().toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.ar.includes(debounced.trim()) ||
          p.brand.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [debounced]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto max-w-3xl px-6 pt-24"
          >
            <div className="flex items-center gap-3 border-b-2 border-orange pb-3">
              <Search size={22} className="text-orange" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.nav.searchPlaceholder}
                className="w-full bg-transparent font-display text-xl text-white placeholder:text-muted focus:outline-none md:text-2xl"
              />
              <button onClick={onClose} aria-label="Close search" className="text-muted hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="mt-8">
              {debounced.trim() ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={results.length}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-1"
                  >
                    {results.length === 0 && (
                      <p className="py-8 text-center text-muted">
                        {lang === "ar" ? "لا توجد نتائج مطابقة" : "No matching results"}
                      </p>
                    )}
                    {results.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-graphite"
                      >
                        <div>
                          <p className="font-medium text-white">{p.name[lang]}</p>
                          <p className="text-xs text-muted">{p.brand}</p>
                        </div>
                        <span className="font-display text-orange">
                          {p.price} {t.product.sar}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      <TrendingUp size={14} /> {lang === "ar" ? "الأكثر بحثاً" : "Trending Searches"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="rounded-full border border-graphite px-3 py-1.5 text-sm text-muted transition-colors hover:border-orange hover:text-white"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      <Clock size={14} /> {lang === "ar" ? "عمليات بحث سابقة" : "Recent Searches"}
                    </p>
                    <p className="text-sm text-muted">
                      {lang === "ar" ? "لا توجد عمليات بحث سابقة بعد" : "No recent searches yet"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
