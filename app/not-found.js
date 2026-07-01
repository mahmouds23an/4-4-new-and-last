"use client";
// app/not-found.js — 404 page

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function NotFound() {
  const { lang } = useLanguage();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="font-display text-8xl font-bold text-orange opacity-60">404</p>
      <h1 className="font-display text-2xl font-bold text-white">
        {lang === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
      </h1>
      <p className="max-w-sm text-muted">
        {lang === "ar"
          ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
          : "The page you're looking for doesn't exist or has been moved."}
      </p>
      <Link href="/"
        className="rounded-md bg-orange px-7 py-3 font-display font-semibold text-white hover:bg-orange-dark">
        {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
      </Link>
    </div>
  );
}
