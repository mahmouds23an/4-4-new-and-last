"use client";
// AccountMenu.jsx — dropdown under the signed-in user's name in the header.
// Shows the user's avatar (falling back to a placeholder icon when the
// backend hasn't returned a profile picture), and links to the profile
// and orders pages plus a sign-out action.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { User, ChevronDown, ClipboardList, LogOut } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";

export default function AccountMenu({ user }) {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const rootRef = useRef(null);

  // Close on outside click.
  useEffect(() => {
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const avatarUrl = user.avatar || user.profile_picture || user.picture || null;
  const displayName = user.first_name || user.username;

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push("/");
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 text-sm text-white transition-colors hover:text-orange"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {avatarUrl && !avatarFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            onError={() => setAvatarFailed(true)}
            className="h-6 w-6 rounded-full border border-graphite object-cover"
          />
        ) : (
          <User size={20} />
        )}
        <span>{displayName}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute end-0 top-full z-50 mt-3 w-48 overflow-hidden rounded-md border border-graphite bg-charcoal shadow-2xl"
          >
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 text-sm text-white transition-colors hover:bg-graphite"
            >
              <User size={16} className="text-orange" />
              {t.nav.account}
            </Link>
            <Link
              href="/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 text-sm text-white transition-colors hover:bg-graphite"
            >
              <ClipboardList size={16} className="text-orange" />
              {t.nav.myOrders}
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 border-t border-graphite px-4 py-3 text-sm text-white transition-colors hover:bg-graphite"
            >
              <LogOut size={16} className="text-orange" />
              {t.nav.logout}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
