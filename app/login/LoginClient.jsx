"use client";
// LoginClient.jsx — /login page: split panel (brand art | form)

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { login } from "@/services/users";
import PlaceholderArt from "@/components/PlaceholderArt";

export default function LoginClient() {
  const { t, lang } = useLanguage();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError(
        lang === "ar" ? "يرجى ملء جميع الحقول" : "Please fill in all fields",
      );
      return;
    }
    setError("");
    setLoading(true);
    try {
      const result = await login({ identifier, password });
      if (result?.user) window.location.href = "/";
    } catch {
      setError(
        lang === "ar"
          ? "بيانات الدخول غير صحيحة"
          : "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col-reverse md:flex-row">
      {/* Form panel */}
      <motion.div
        initial={{ opacity: 0, x: lang === "ar" ? 40 : -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-1 flex-col justify-center px-6 py-12 md:px-12 lg:px-20"
      >
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-1 font-display md:hidden">
          <span className="text-2xl font-bold text-white">4X4</span>
          <span className="rounded-sm bg-orange px-1.5 py-0.5 text-[10px] font-bold text-white">
            CENTER
          </span>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h1 className="mb-1 font-display text-3xl font-bold text-white">
            {t.login.title}
          </h1>
          <p className="mb-8 text-sm text-muted">{t.login.subtitle}</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 rounded-md border border-orange/30 bg-orange/10 px-4 py-3 text-sm text-orange"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">
                {t.login.emailLabel}
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={t.login.emailPlaceholder}
                autoComplete="username"
                className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted transition-colors focus:border-orange focus:outline-none"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-white">
                  {t.login.passwordLabel}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-orange hover:underline"
                >
                  {t.login.forgot}
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login.passwordPlaceholder}
                  autoComplete="current-password"
                  className="w-full rounded-md border border-graphite bg-charcoal px-4 pe-12 py-3 text-sm text-white placeholder:text-muted transition-colors focus:border-orange focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                  aria-label="toggle password"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-orange"
              />
              <span className="text-sm text-muted">{t.login.rememberMe}</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-orange py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <LogIn size={16} />
                  {t.login.submit}
                </>
              )}
            </button>
          </form>

          <div className="relative my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-graphite" />
            <span className="text-xs text-muted">{t.login.or}</span>
            <div className="flex-1 border-t border-graphite" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Google", icon: "G" },
              { label: "Apple", icon: "" },
              { label: "Huawei", icon: "H" },
            ].map((s) => (
              <button
                key={s.label}
                className="flex items-center justify-center gap-2 rounded-md border border-graphite bg-charcoal py-3 text-sm text-white transition-colors hover:border-orange"
                aria-label={`Sign in with ${s.label}`}
              >
                <span className="font-bold">{s.icon || s.label[0]}</span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            {t.login.noAccount}{" "}
            <Link
              href="/register"
              className="font-semibold text-orange hover:underline"
            >
              {t.login.createAccount}
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Brand art panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative hidden overflow-hidden md:block md:w-[46%] lg:w-[52%]"
      >
        <PlaceholderArt
          icon="Gauge"
          accent="orange"
          label="4x4 Center adventure"
          className="h-full w-full"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/30 to-transparent p-12">
          <div className="mb-4 flex items-center gap-1 font-display">
            <span className="text-3xl font-bold text-white">4X4</span>
            <span className="rounded-sm bg-orange px-2 py-0.5 text-sm font-bold text-white">
              CENTER
            </span>
          </div>
          <h2 className="mb-3 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            {t.login.sideTitle}
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {t.login.sideText}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
