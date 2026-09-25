"use client";

import Icon from "@/components/ui/Icon";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"
    >
      Back to top
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal group-active:scale-90">
        <Icon name="up" className="h-5 w-5" />
      </span>
    </button>
  );
}
