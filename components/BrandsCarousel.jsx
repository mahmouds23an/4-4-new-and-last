"use client";
// BrandsCarousel.jsx — infinite auto-scroll brand logo strip

import { useLanguage } from "@/lib/LanguageContext";
import SectionHeader from "./SectionHeader";
import Image from "next/image";

export default function BrandsCarousel({ brands }) {
  const { t } = useLanguage();
  const items = [...brands, ...brands, ...brands];
  return (
    <section className="mx-auto max-w-360 overflow-hidden px-4 pb-14 md:px-6 md:pb-20">
      <SectionHeader title={t.sections.topBrands} />
      <div className="group relative">
        <div className="pointer-events-none absolute inset-s-0 top-0 z-10 h-full w-20 bg-linear-to-r from-black to-transparent rtl:from-transparent rtl:to-black" />
        <div className="pointer-events-none absolute inset-e-0 top-0 z-10 h-full w-20 bg-linear-to-l from-black to-transparent rtl:from-transparent rtl:to-black" />
        <div className="overflow-hidden group-hover:[animation-play-state:paused] *:[animation-play-state:inherit]">
          <div className="flex shrink-0 animate-[scroll-x_30s_linear_infinite] gap-4">
            {items.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="grid h-16 w-36 shrink-0 place-items-center rounded-lg border border-graphite bg-charcoal px-4 transition-colors hover:border-orange/60"
              >
                <span className="font-display text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:text-white">
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className="h-auto w-auto object-contain"
                    />
                  ) : (
                    brand.name
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
