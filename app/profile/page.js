"use client";
// app/profile/page.js — /profile: shows the signed-in user's account info.
// Pulled straight from AuthContext (already fetched via GET /api/v1/profile/
// on load), so no extra request is needed here. Shows the backend avatar
// URL when present, otherwise falls back to a placeholder icon.

import Link from "next/link";
import { User, Mail, AtSign, ClipboardList, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import RequireAuth from "@/components/RequireAuth";

function ProfileContent() {
  const { lang } = useLanguage();
  const { user } = useAuth();

  const avatarUrl = user.avatar || user.profile_picture || user.picture || null;
  const fullName =
    [user.first_name, user.last_name].filter(Boolean).join(" ") ||
    user.username;

  const fields = [
    { icon: AtSign, label: lang === "ar" ? "اسم المستخدم" : "Username", value: user.username },
    { icon: Mail, label: lang === "ar" ? "البريد الإلكتروني" : "Email", value: user.email },
  ].filter((f) => f.value);

  return (
    <div className="mx-auto max-w-[720px] px-4 py-10 md:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-white">
          {lang === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <ChevronRight size={12} data-flip-rtl="true" />
        <span className="text-white">
          {lang === "ar" ? "الملف الشخصي" : "Profile"}
        </span>
      </nav>

      <div className="rounded-md border border-graphite bg-charcoal p-8">
        <div className="mb-8 flex items-center gap-4">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt=""
              className="h-16 w-16 rounded-full border border-graphite object-cover"
            />
          ) : (
            <div className="grid h-16 w-16 place-items-center rounded-full bg-graphite">
              <User size={28} className="text-muted" />
            </div>
          )}
          <div>
            <h1 className="font-display text-xl font-bold text-white">
              {fullName}
            </h1>
            <p className="text-sm text-muted">@{user.username}</p>
          </div>
        </div>

        <div className="space-y-4 border-t border-graphite pt-6">
          {fields.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <f.icon size={16} className="shrink-0 text-orange" />
              <div>
                <p className="text-xs text-muted">{f.label}</p>
                <p className="text-sm text-white">{f.value}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/orders"
          className="mt-8 flex items-center justify-center gap-2 rounded-md border border-graphite py-3 text-sm font-semibold text-white transition-colors hover:border-orange"
        >
          <ClipboardList size={16} className="text-orange" />
          {lang === "ar" ? "عرض طلباتي" : "View my orders"}
        </Link>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <RequireAuth>
      <ProfileContent />
    </RequireAuth>
  );
}
