"use client";
// SectionHeader.jsx — shared title row for every homepage section

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SectionHeader({ title, linkLabel, linkHref }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
          {title}
        </h2>
        <div className="mt-2 h-[3px] w-12 rounded-full bg-orange"/>
      </div>
      {linkLabel && linkHref && (
        <Link href={linkHref}
          className="flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-orange">
          {linkLabel}
          <ChevronRight size={15} data-flip-rtl="true"/>
        </Link>
      )}
    </div>
  );
}
