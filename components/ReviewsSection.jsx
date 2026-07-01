"use client";

// ReviewsSection.jsx
// What this is: the homepage customer testimonials row. Receives the reviews
// array from the Home page (via services/reviews.js / mock data fallback).
// Each card shows name, location, star rating and review text — bilingual.

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeader from "./SectionHeader";

export default function ReviewsSection({ reviews }) {
  const { t, lang } = useLanguage();

  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-14 md:px-6 md:pb-20">
      <SectionHeader title={t.sections.reviews} />
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="relative overflow-hidden rounded-xl border border-graphite bg-charcoal p-6"
          >
            <Quote
              size={40}
              className="absolute end-4 top-4 text-orange/10"
              strokeWidth={1}
            />
            {/* Stars */}
            <div className="mb-3 flex">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={si}
                  size={14}
                  className={si < r.rating ? "text-amber" : "text-graphite-light"}
                  fill={si < r.rating ? "#f2a93b" : "none"}
                />
              ))}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted">{r.text[lang]}</p>
            <div>
              <p className="text-sm font-semibold text-white">{r.name}</p>
              <p className="text-xs text-muted">{r.location[lang]}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
