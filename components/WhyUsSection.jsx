"use client";
// WhyUsSection.jsx — "Why Choose 4x4 Center" 4-tile feature section

import { motion } from "framer-motion";
import { Award, ShieldCheck, Truck, Headphones } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeader from "./SectionHeader";

const ICONS = [Award, ShieldCheck, Truck, Headphones];
const KEYS  = ["experience", "genuine", "shipping", "support"];

export default function WhyUsSection() {
  const { t } = useLanguage();
  return (
    <section className="border-y border-graphite bg-charcoal">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-6 md:py-20">
        <SectionHeader title={t.sections.whyChooseUs}/>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KEYS.map((key, i) => {
            const Icon = ICONS[i];
            const item = t.whyUs[key];
            return (
              <motion.div key={key}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex items-start gap-4 rounded-xl border border-graphite bg-black p-6 transition-all hover:border-orange/40">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors"
                  style={{ background: "rgba(204,20,20,.1)" }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(204,20,20,.2)"}
                  onMouseLeave={e => e.currentTarget.style.background="rgba(204,20,20,.1)"}>
                  <Icon size={22} className="text-orange" strokeWidth={1.5}/>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white md:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
