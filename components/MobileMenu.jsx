"use client";

// MobileMenu.jsx
// What this is: the slide-in drawer shown on mobile/tablet when the
// hamburger icon is tapped. Includes all nav links, an expandable
// categories accordion, account links and the language toggle.

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown, User, Heart, ShoppingCart } from "lucide-react";
import { resolveIcon } from "@/lib/icon-map";
import { useLanguage } from "@/lib/LanguageContext";

export default function MobileMenu({ open, onClose, categories, navLinks }) {
  const { t, lang, toggleLanguage } = useLanguage();
  const [expandedCat, setExpandedCat] = useState(null);

  const toggle = (id) => setExpandedCat((prev) => (prev === id ? null : id));

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
            initial={{ x: lang === "ar" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: lang === "ar" ? "100%" : "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed inset-y-0 start-0 z-[70] flex w-[85vw] max-w-sm flex-col bg-charcoal shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-graphite px-5 py-4">
              <Link href="/" onClick={onClose} className="flex items-center gap-1 font-display">
                <span className="text-xl font-bold text-white">4X4</span>
                <span className="rounded-sm bg-orange px-1.5 py-0.5 text-[10px] font-bold text-white">CENTER</span>
              </Link>
              <button onClick={onClose} aria-label="Close menu" className="text-muted hover:text-white">
                <X size={22} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              {/* Account */}
              <div className="flex gap-4 border-b border-graphite px-5 py-4">
                <Link href="/login" onClick={onClose} className="flex flex-1 items-center gap-2 text-sm text-white">
                  <User size={18} className="text-orange" />
                  {t.nav.signIn}
                </Link>
                <Link href="/wishlist" onClick={onClose} className="text-muted hover:text-white">
                  <Heart size={18} />
                </Link>
                <Link href="/cart" onClick={onClose} className="text-muted hover:text-white">
                  <ShoppingCart size={18} />
                </Link>
              </div>

              {/* Categories accordion */}
              <div className="border-b border-graphite">
                <p className="px-5 pt-4 pb-2 text-xs font-semibold uppercase tracking-widest text-muted">
                  {t.nav.categories}
                </p>
                {categories.map((cat) => {
                  const Icon = resolveIcon(cat.icon);
                  return (
                    <div key={cat.id} className="border-t border-graphite/50">
                      <button
                        onClick={() => toggle(cat.id)}
                        className="flex w-full items-center justify-between px-5 py-3.5 text-start text-sm text-white"
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={15} className="text-orange" />
                          {cat.name[lang]}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-muted transition-transform ${expandedCat === cat.id ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedCat === cat.id && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            {cat.subcategories.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href={`/category/${cat.slug}/${sub.slug}`}
                                  onClick={onClose}
                                  className="block py-2.5 pe-5 ps-12 text-sm text-muted transition-colors hover:text-white"
                                >
                                  {sub.name[lang]}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Nav links */}
              <div className="py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={`/category/${link.slug}`}
                    onClick={onClose}
                    className="block px-5 py-3 text-sm text-muted transition-colors hover:text-white"
                  >
                    {t.nav[link.key]}
                  </Link>
                ))}
                <Link href="/contact" onClick={onClose} className="block px-5 py-3 text-sm text-muted hover:text-white">
                  {t.nav.contact}
                </Link>
              </div>
            </div>

            {/* Footer: language switch */}
            <div className="border-t border-graphite px-5 py-4">
              <button
                onClick={() => { toggleLanguage(); onClose(); }}
                className="w-full rounded-md border border-graphite py-2.5 text-sm font-medium text-white transition-colors hover:border-orange hover:text-orange"
              >
                {lang === "en" ? "العربية 🌐" : "English 🌐"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
