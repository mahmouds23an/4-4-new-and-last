"use client";

// LanguageContext.js
// What this is: the single client-side source of truth for the active
// language (en/ar). It keeps the chosen language in state + localStorage,
// flips <html dir/lang> instantly (no page refresh), and hands every
// component the right dictionary via the useLanguage() hook.
//
// Usage:
//   const { lang, dir, t, toggleLanguage } = useLanguage();
//   <p>{t.nav.home}</p>

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";

const dictionaries = { en, ar };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [ready, setReady] = useState(false);

  // Load any previously saved preference on first mount (client only).
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("4x4-lang") : null;
    if (saved === "ar" || saved === "en") {
      setLang(saved);
    }
    setReady(true);
  }, []);

  // Keep <html lang="" dir=""> in sync so the browser, screen readers and
  // CSS [dir="rtl"] selectors all react instantly.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("4x4-lang", lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: dictionaries[lang],
      setLanguage: setLang,
      toggleLanguage: () => setLang((prev) => (prev === "en" ? "ar" : "en")),
    }),
    [lang]
  );

  // Avoid a hydration flash of the wrong language by rendering children only
  // once we've checked localStorage (this runs in a few ms).
  if (!ready) {
    return (
      <LanguageContext.Provider value={value}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </LanguageContext.Provider>
    );
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
