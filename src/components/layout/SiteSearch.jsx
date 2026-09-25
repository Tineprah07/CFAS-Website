"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import site from "@/data/site";
import home from "@/data/home";
import Icon from "@/components/ui/Icon";

// Everything the search box can find.
const index = [
  ...site.navLinks.map((l) => ({ label: l.label, href: l.href, kind: "Page" })),
  ...home.sermons.map((s) => ({ label: s.title, href: `/sermons/${s.slug}`, kind: "Sermon", meta: s.series })),
  ...home.events.map((e) => ({ label: e.title, href: `/events/${e.slug}`, kind: "Event", meta: e.place })),
];

export default function SiteSearch({ dark = false, onNavigate }) {
  const router = useRouter();
  const listId = useId();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const results = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return index
      .filter((item) => {
        const text = `${item.label} ${item.kind} ${item.meta ?? ""}`.toLowerCase();
        return words.every((w) => text.includes(w));
      })
      .slice(0, 6);
  }, [query]);

  // "/" or Cmd/Ctrl+K jumps to search (only for the visible, non-drawer box).
  useEffect(() => {
    if (dark) return;
    const onKeyDown = (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
      if ((e.key === "/" && !typing) || (e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dark]);

  const go = (item) => {
    router.push(item.href);
    setQuery("");
    inputRef.current?.blur();
    onNavigate?.();
  };

  const onKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[highlight]);
    } else if (e.key === "Escape") {
      setQuery("");
    }
  };

  const showResults = focused && query.trim() !== "";

  return (
    <div className="relative" role="search">
      <label
        className={`group flex h-11 items-center gap-2.5 rounded-full border px-4 transition-all duration-200 ${
          dark
            ? "border-white/15 bg-white/5 text-white focus-within:border-gold"
            : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/30 focus-within:border-charcoal focus-within:shadow-[0_0_0_4px_rgb(212_175_55/0.25)]"
        }`}
      >
        <Icon
          name="search"
          className="h-4.5 w-4.5 shrink-0 opacity-60 transition-transform group-focus-within:scale-110"
        />
        <span className="sr-only">Search the site</span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          placeholder="Search sermons, events, pages…"
          role="combobox"
          aria-expanded={showResults}
          aria-controls={listId}
          aria-activedescendant={showResults && results.length ? `${listId}-${highlight}` : undefined}
          autoComplete="off"
          className="w-full bg-transparent text-sm outline-none placeholder:text-current/50 [&::-webkit-search-cancel-button]:hidden"
        />
        {!dark && (
          <kbd className="hidden rounded-md border border-charcoal/15 px-1.5 py-0.5 text-[0.65rem] font-medium text-charcoal/50 lg:block">
            /
          </kbd>
        )}
      </label>

      {showResults && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-10 mt-2 animate-pop-in overflow-hidden rounded-2xl border border-black/5 bg-white p-1.5 text-charcoal shadow-[0_20px_50px_-12px_rgb(0_0_0/0.25)]"
        >
          {results.length === 0 && (
            <li className="px-3 py-4 text-center text-sm text-charcoal/50">No results for &ldquo;{query}&rdquo;</li>
          )}
          {results.map((item, i) => (
            <li
              key={item.href}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === highlight}
              // mousedown fires before the input blurs and hides the list.
              onMouseDown={(e) => {
                e.preventDefault();
                go(item);
              }}
              onMouseEnter={() => setHighlight(i)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${i === highlight ? "bg-sand" : ""}`}
            >
              <span className="rounded-md bg-gold/15 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-gold-dark uppercase">
                {item.kind}
              </span>
              <span className="flex-1 truncate text-sm font-medium">{item.label}</span>
              {item.meta && <span className="hidden truncate text-xs text-charcoal/45 sm:block">{item.meta}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
