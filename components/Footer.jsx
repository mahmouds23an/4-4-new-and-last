"use client";

// Footer.jsx
// What this is: the global site footer rendered inside app/layout.js.
// Four-column layout (about, shop links, company links, newsletter) on
// desktop; stacks to single column on mobile. Fully bilingual via
// LanguageContext.

import Link from "next/link";
import { Share2, Globe, Rss, Send, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const SHOP_LINKS = [
  { label: { en: "Performance & Suspension", ar: "الأداء والعزم" }, href: "/category/performance-suspension" },
  { label: { en: "Lighting & Spotlights", ar: "الإضاءة والكشافات" }, href: "/category/lighting-spotlights" },
  { label: { en: "Tires & Wheels", ar: "الإطارات والجنوط" }, href: "/category/tires-wheels" },
  { label: { en: "Trip Supplies", ar: "مستلزمات الرحلات" }, href: "/category/trip-supplies" },
  { label: { en: "Apparel", ar: "الملابس والإكسسوارات" }, href: "/category/apparel-accessories" },
];

const LEGAL_LINKS = [
  { key: "privacy", href: "/privacy-policy" },
  { key: "terms", href: "/terms" },
  { key: "shipping", href: "/shipping" },
  { key: "returns", href: "/returns" },
];

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="border-t border-graphite bg-charcoal">
      <div className="mx-auto max-w-[1440px] px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand blurb */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-1 font-display">
              <span className="text-2xl font-bold text-white">4X4</span>
              <span className="rounded-sm bg-orange px-1.5 py-0.5 text-[10px] font-bold text-white">CENTER</span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-muted">{t.footer.about}</p>
            <div className="flex gap-3">
              {[Share2, Globe, Rss, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-9 w-9 place-items-center rounded-full border border-graphite text-muted transition-all hover:border-orange hover:text-orange"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-white">
              {t.footer.shop}
            </h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-white">
                    {l.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-white">
              {t.footer.company}
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-muted hover:text-white">{t.footer.aboutUs}</Link></li>
              <li><Link href="/contact" className="text-sm text-muted hover:text-white">{t.footer.contactUs}</Link></li>
              <li><Link href="/faq" className="text-sm text-muted hover:text-white">{t.footer.faq}</Link></li>
              {LEGAL_LINKS.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-sm text-muted hover:text-white">
                    {t.footer[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-white">
              {t.footer.newsletter}
            </h3>
            <p className="mb-4 text-sm text-muted">{t.sections.newsletterText}</p>
            <div className="flex overflow-hidden rounded-md border border-graphite focus-within:border-orange">
              <div className="flex items-center px-3 text-muted">
                <Mail size={16} />
              </div>
              <input
                type="email"
                placeholder={t.sections.newsletterPlaceholder}
                className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-muted focus:outline-none"
              />
              <button className="bg-orange px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-dark">
                {t.sections.newsletterCta}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-graphite pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} 4x4 Center. {t.footer.rights}
          </p>
          <p className="text-xs text-muted">{t.footer.payments}: Visa · Mastercard · Mada · Apple Pay · STC Pay</p>
        </div>
      </div>
    </footer>
  );
}
