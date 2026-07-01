"use client";
// TopBar.jsx — thin promo strip above header: shipping promo + country + lang toggle

import { Truck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TopBar() {
  const { t, lang, toggleLanguage } = useLanguage();
  return (
    <div className="hidden border-b border-graphite bg-black text-xs text-muted md:block">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2">
          <Truck size={14} style={{ color: "var(--color-amber)" }}/>
          <span>{t.topbar.promo}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{t.topbar.country}</span>
          <button onClick={toggleLanguage}
            className="font-medium text-white transition-colors hover:text-orange"
            aria-label="Switch language">
            {lang === "en" ? "العربية" : "EN"}
          </button>
        </div>
      </div>
    </div>
  );
}
