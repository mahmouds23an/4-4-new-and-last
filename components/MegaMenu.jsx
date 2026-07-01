"use client";
// MegaMenu.jsx — animated dropdown under "Categories" nav button (desktop)

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { resolveIcon } from "@/lib/icon-map";
import { useLanguage } from "@/lib/LanguageContext";

export default function MegaMenu({ categories, open }) {
  const { lang } = useLanguage();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute start-0 top-full z-40 w-full border-t border-graphite bg-charcoal shadow-2xl">
          <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-8 px-6 py-8">
            {categories.map((cat) => {
              const Icon = resolveIcon(cat.icon);
              return (
                <div key={cat.id}>
                  <Link href={`/category/${cat.slug}`}
                    className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:text-orange">
                    <Icon size={16} className="text-orange"/>
                    {cat.name[lang]}
                  </Link>
                  <ul className="space-y-2">
                    {cat.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <Link href={`/category/${cat.slug}/${sub.slug}`}
                          className="text-sm text-muted transition-colors hover:text-white">
                          {sub.name[lang]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
