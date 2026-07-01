"use client";

// NewsletterSection.jsx
// What this is: the full-width email signup band rendered just before the
// footer. Bold typography echoing the rally/adventure identity, orange CTA.

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function NewsletterSection() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-graphite bg-charcoal">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-2xl px-6 py-16 text-center"
      >
        <h2 className="mb-3 font-display text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
          {t.sections.newsletterTitle}
        </h2>
        <p className="mb-8 text-muted">{t.sections.newsletterText}</p>
        <div className="flex overflow-hidden rounded-full border border-graphite bg-black focus-within:border-orange">
          <div className="flex items-center px-4 text-muted">
            <Mail size={18} />
          </div>
          <input
            type="email"
            placeholder={t.sections.newsletterPlaceholder}
            className="flex-1 bg-transparent py-3.5 text-sm text-white placeholder:text-muted focus:outline-none"
          />
          <button className="m-1 rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark">
            {t.sections.newsletterCta}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
