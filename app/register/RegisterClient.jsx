"use client";
// RegisterClient.jsx — /register page: split panel (brand art | form)

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { register } from "@/services/users";
import PlaceholderArt from "@/components/PlaceholderArt";
import { useRouter } from "next/navigation";

export default function RegisterClient() {
  const { t, lang } = useLanguage();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !username.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError(
        lang === "ar" ? "يرجى ملء جميع الحقول" : "Please fill in all fields",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        lang === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match",
      );
      return;
    }

    if (!acceptTerms) {
      setError(
        lang === "ar"
          ? "يجب الموافقة على الشروط والأحكام"
          : "You must accept the terms.",
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register({
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      alert(
        lang === "ar"
          ? "تم إنشاء الحساب بنجاح"
          : "Account created successfully",
      );

      router.push("/login");
    } catch (err) {
      setError(
        err?.message ||
          (lang === "ar" ? "بيانات الدخول غير صحيحة" : "Invalid credentials."),
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
            {t.register?.title}
          </h1>
          <p className="mb-8 text-sm text-muted">{t.register?.subtitle}</p>

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
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={
                  lang === "ar" ? "أدخل اسم المستخدم" : "Enter your username"
                }
                autoComplete="username"
                required
                className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted transition-colors focus:border-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={
                  lang === "ar" ? "أدخل اسمك الأول" : "Enter your first name"
                }
                required
                className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">
                Last Name
              </label>

              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={
                  lang === "ar" ? "أدخل اسم عائلتك" : "Enter your last name"
                }
                required
                className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">
                Email
              </label>

              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  lang === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"
                }
                className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    lang === "ar" ? "أدخل كلمة المرور" : "Enter your password"
                  }
                  className="w-full rounded-md border border-graphite bg-charcoal px-4 pe-12 py-3 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">
                Confirm Password
              </label>

              <input
                type={showPass ? "text" : "password"}
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={
                  lang === "ar" ? "أكد كلمة المرور" : "Confirm your password"
                }
                className="w-full rounded-md border border-graphite bg-charcoal px-4 py-3 text-sm text-white placeholder:text-muted focus:border-orange focus:outline-none"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 accent-orange"
              />
              <span className="text-sm text-muted">
                {t.register?.acceptTerms}
              </span>
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
                  <UserPlus size={16} /> {t.register?.submit}
                </>
              )}
            </button>
          </form>

          <div className="relative my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-graphite" />
            <span className="text-xs text-muted">{t.register?.or}</span>
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
            {t.register?.alreadyHaveAccount}{" "}
            <Link
              href="/login"
              className="font-semibold text-orange hover:underline"
            >
              {t.register?.signIn}
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
            {t.register?.sideTitle}
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {t.register?.sideText}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
