"use client";

import { useId, useState } from "react";

// Numbered list of beliefs; click one to open it (the first starts open).
export default function FaithAccordion({ items }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-${i}`;
        return (
          <li key={item.title}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-center gap-5 py-6 text-left transition-all active:scale-[0.99] sm:gap-8"
              >
                <span
                  className={`font-display text-4xl leading-none tabular-nums transition-colors duration-300 ${
                    isOpen ? "text-gold-dark" : "text-charcoal/20 group-hover:text-charcoal/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-xl font-bold sm:text-2xl">{item.title}</span>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-charcoal bg-charcoal text-white"
                      : "border-charcoal/15 group-hover:border-charcoal"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            {/* Animates height by growing the grid row from 0fr to 1fr. */}
            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p
                  className={`pb-7 pl-[3.25rem] text-lg leading-relaxed text-charcoal/65 transition-opacity duration-500 sm:pl-[4.25rem] ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
