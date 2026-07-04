"use client";
// Header.jsx — sticky header with live cart count from CartContext

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import TopBar from "./TopBar";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";
import MobileMenu from "./MobileMenu";
import CartDrawer from "./CartDrawer";
import categories from "@/data/categories";
import { useAuth } from "@/lib/AuthContext";

const NAV_LINKS = [
  { key: "performance", slug: "performance-suspension" },
  { key: "lighting", slug: "lighting-spotlights" },
  { key: "tires", slug: "tires-wheels" },
  { key: "apparel", slug: "apparel-accessories" },
  { key: "tripSupplies", slug: "trip-supplies" },
];

export default function Header() {
  const { t } = useLanguage();
  const { count } = useCart();
  const { user, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <motion.div
        animate={{
          paddingTop: scrolled ? 10 : 18,
          paddingBottom: scrolled ? 10 : 18,
        }}
        transition={{ duration: 0.25 }}
        className="border-b border-graphite bg-black/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-360 items-center gap-4 px-4 md:px-6">
          <button
            className="text-white md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <Link
            href="/"
            className="flex shrink-0 items-center gap-1 font-display"
          >
            <span className="text-2xl font-bold leading-none text-white">
              4X4
            </span>
            <span className="rounded-sm bg-orange px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
              CENTER
            </span>
          </Link>

          {/* Desktop search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden flex-1 items-center gap-2 rounded-md border border-graphite bg-charcoal px-4 py-2.5 text-sm text-muted transition-colors hover:border-orange/60 md:flex"
          >
            <Search size={16} />
            <span>{t.nav.searchPlaceholder}</span>
          </button>

          {/* Mobile search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="ms-auto text-white md:hidden"
            aria-label="Search"
          >
            <Search size={22} />
          </button>

          {/* Desktop icons */}
          <div className="hidden items-center gap-5 md:flex">
            {loading ? (
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <User size={20} />
                <span>...</span>
              </div>
            ) : user ? (
              <button className="flex items-center gap-1.5 text-sm text-white transition-colors hover:text-orange">
                <User size={20} />

                <span>{user.first_name || user.username}</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm text-white transition-colors hover:text-orange"
              >
                <User size={20} />

                <span>{t.nav.signIn}</span>
              </Link>
            )}
            <Link
              href="/wishlist"
              className="text-white transition-colors hover:text-orange"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-white transition-colors hover:text-orange"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -inset-e-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-orange text-[10px] font-bold text-white">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>

          {/* Mobile cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white md:hidden"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -inset-e-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-orange text-[10px] font-bold text-white">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
        </div>

        {/* Desktop nav row */}
        <nav
          className="relative mx-auto mt-3 hidden max-w-360 items-center gap-7 px-6 md:flex"
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <button className="flex items-center gap-1 rounded bg-orange px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark">
            {t.nav.categories}
            <ChevronDown
              size={14}
              className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
            />
          </button>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.key}
              href={`/category/${l.slug}`}
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {t.nav[l.key]}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm text-muted transition-colors hover:text-white"
          >
            {t.nav.contact}
          </Link>
          <MegaMenu categories={categories} open={megaOpen} />
        </nav>
      </motion.div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
        navLinks={NAV_LINKS}
      />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
