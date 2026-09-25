"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import SpotlightCard from "@/components/ui/SpotlightCard";

// Segmented switcher with a sliding pill, and cards that animate in per tab.
export default function ExperienceTabs({ experiences }) {
  const [active, setActive] = useState(0);
  const current = experiences[active];

  const onKeyDown = (e) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const nextIndex = (active + step + experiences.length) % experiences.length;
    setActive(nextIndex);
    e.currentTarget.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Ways to connect"
        onKeyDown={onKeyDown}
        className="relative mx-auto grid w-full max-w-md rounded-full bg-sand p-1.5"
        style={{ gridTemplateColumns: `repeat(${experiences.length}, minmax(0, 1fr))` }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 left-1.5 rounded-full bg-charcoal shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: `calc((100% - 0.75rem) / ${experiences.length})`,
            transform: `translateX(${active * 100}%)`,
          }}
        />
        {experiences.map((exp, i) => (
          <button
            key={exp.id}
            type="button"
            role="tab"
            id={`tab-${exp.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${exp.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`relative z-10 h-11 rounded-full text-sm font-semibold transition-colors duration-300 active:scale-95 ${
              i === active ? "text-white" : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            {exp.label}
          </button>
        ))}
      </div>

      <div
        key={current.id}
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5"
      >
        {current.items.map((item, i) => (
          <div key={item.title} className="animate-fade-up" style={{ animationDelay: `${i * 90}ms` }}>
            <SpotlightCard
              href={item.href}
              className={`h-full p-7 sm:p-8 ${
                i === 0
                  ? "bg-charcoal text-white"
                  : "border border-black/5 bg-white text-charcoal shadow-[0_10px_40px_-20px_rgb(0_0_0/0.2)]"
              }`}
            >
              <div className="relative flex h-full min-h-56 flex-col">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                    i === 0 ? "bg-gold text-charcoal" : "bg-gold/15 text-gold-dark"
                  }`}
                >
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-auto pt-10 text-2xl font-bold">{item.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-white/65" : "text-charcoal/60"}`}>
                  {item.text}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${i === 0 ? "text-gold" : "text-gold-dark"}`}
                >
                  Explore
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </span>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
}
