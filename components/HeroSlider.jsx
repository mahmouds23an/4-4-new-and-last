"use client";
// HeroSlider.jsx — full-bleed cinematic slider.
// Each slide: full-width image (desktop + mobile version) uploaded by admin
// with text baked in via Photoshop. We show: image + 2 CTA buttons below.
// Placeholder art shown until real images are uploaded.

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import PlaceholderArt from "./PlaceholderArt";

const MOCK_SLIDES = [
  {
    id: "s1",
    desktopImage: "/images/heroSliders/s1.jpg",
    mobileImage: null,
    icon: "Gauge",
    accent: "orange",
    label: { en: "4*4", ar: "4*4" },
    cta1: {
      label: { en: "Shop Now", ar: "تسوق الآن" },
      href: "/products",
    },
    cta2: {
      label: { en: "Explore Products", ar: "تصفح المنتجات" },
      href: "/#products",
    },
  },
  {
    id: "s2",
    desktopImage: "/images/heroSliders/s2.jpg",
    mobileImage: null,
    icon: "Gauge",
    accent: "orange",
    label: { en: "Performance & Suspension", ar: "الأداء والعزم" },
    cta1: {
      label: { en: "Shop Now", ar: "تسوق الآن" },
      href: "/products",
    },
    cta2: {
      label: { en: "Explore Categories", ar: "تصفح الأقسام" },
      href: "/#products",
    },
  },
  {
    id: "s3",
    desktopImage: "/images/heroSliders/s3.jpg",
    mobileImage: null,
    icon: "Lightbulb",
    accent: "amber",
    label: { en: "Lighting & Spotlights", ar: "الإضاءة والكشافات" },
    cta1: {
      label: { en: "Shop Products", ar: "تسوق منتجاتنا" },
      href: "/products",
    },
    cta2: {
      label: { en: "View Products", ar: "استعرض المنتجات" },
      href: "/#products",
    },
  },
  {
    id: "s4",
    desktopImage: "/images/heroSliders/s4.jpg",
    mobileImage: null,
    icon: "Tent",
    accent: "charcoal",
    label: { en: "Trip Supplies", ar: "مستلزمات الرحلات" },
    cta1: {
      label: { en: "Gear Up", ar: "جهّز نفسك" },
      href: "/products",
    },
    cta2: {
      label: { en: "Best Sellers", ar: "الأكثر مبيعاً" },
      href: "/#products",
    },
  },
];

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir < 0 ? 80 : -80 }),
};

export default function HeroSlider() {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback(
    (next) => {
      setDir(next > index ? 1 : -1);
      setIndex((next + MOCK_SLIDES.length) % MOCK_SLIDES.length);
    },
    [index],
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(index + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [index, paused, go]);

  const slide = MOCK_SLIDES[index];

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide visual */}
      <div className="relative aspect-16/7 w-full md:aspect-16/6">
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={slide.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.32, 0, 0.67, 0] }}
            className="absolute inset-0"
          >
            {slide.desktopImage ? (
              <>
                <Image
                  src={slide.desktopImage}
                  alt={slide.label[lang]}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="hidden object-cover md:block"
                />
                <Image
                  src={slide.mobileImage ?? slide.desktopImage}
                  alt={slide.label[lang]}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover md:hidden"
                />
              </>
            ) : (
              <PlaceholderArt
                icon={slide.icon}
                accent={slide.accent}
                label={slide.label[lang]}
                className="h-full w-full"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/80 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={() => go(index - 1)}
          className="absolute inset-s-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-orange md:h-11 md:w-11 md:inset-s-5"
          aria-label="Previous"
        >
          <ChevronLeft size={20} data-flip-rtl="true" />
        </button>
        <button
          onClick={() => go(index + 1)}
          className="absolute inset-e-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-orange md:h-11 md:w-11 md:inset-e-5"
          aria-label="Next"
        >
          <ChevronRight size={20} data-flip-rtl="true" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 inset-s-0 inset-e-0 z-10 flex justify-center gap-2">
          {MOCK_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all ${i === index ? "w-6 h-2 bg-orange" : "w-2 h-2 bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* CTA row — below image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + "-cta"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 bg-black px-4 py-5 md:py-7"
        >
          <Link
            href={slide.cta1.href}
            className="inline-flex min-w-35 items-center justify-center rounded-md bg-orange px-6 py-3 font-display text-sm font-semibold text-white shadow transition-colors hover:bg-orange-dark md:text-base"
          >
            {slide.cta1.label[lang]}
          </Link>
          <Link
            href={slide.cta2.href}
            className="inline-flex min-w-35 items-center justify-center rounded-md border border-white/25 px-6 py-3 font-display text-sm font-semibold text-white backdrop-blur transition-colors hover:border-orange hover:text-orange md:text-base"
          >
            {slide.cta2.label[lang]}
          </Link>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
