"use client";
// CategoryGrid.jsx — "Shop By Category" section: Full Image Cover Cards

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { resolveIcon } from "@/lib/icon-map";
import SectionHeader from "./SectionHeader";
import Image from "next/image";

export default function CategoryGrid({ categories }) {
  const { t, lang } = useLanguage();

  return (
    <section
      id="categories"
      className="mx-auto max-w-360 px-4 py-14 md:px-6 md:py-20"
    >
      <SectionHeader
        title={t.sections.shopByCategory}
        linkLabel={t.sections.viewAllCategories}
        linkHref="/categories"
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {categories.map((cat, i) => {
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              className="relative aspect-square w-full overflow-hidden rounded-2xl" // مربع مثالي مع حواف دائرية
            >
              <Link
                href={`/category/${cat.slug}`}
                className="group block h-full w-full"
              >
                {/* الصورة أو الأيقونة تملأ المربع بالكامل */}
                {cat.image ? (
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name[lang]}
                      fill // تملأ المكان بالكامل
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-105" // تكبير عند الهوفر
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                    />
                    {/* طبقة داكنة عند الهوفر عشان النص يبان أوفر (اختياري) */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  </div>
                ) : (
                  // في حالة عدم وجود صورة، نعرض النص أو الأيقونة في المنتصف بخلفية بسيطة
                  <div className="flex h-full w-full flex-col items-center justify-center bg-charcoal transition-colors group-hover:bg-graphite">
                    {cat.icon && (
                      <div className="mb-2">
                        {(() => {
                          const Icon = resolveIcon(cat.icon);
                          return (
                            <Icon
                              size={32}
                              className="text-white"
                              strokeWidth={1.5}
                            />
                          );
                        })()}
                      </div>
                    )}
                    <span className="text-xs font-medium text-white sm:text-sm">
                      {cat.name[lang]}
                    </span>
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
