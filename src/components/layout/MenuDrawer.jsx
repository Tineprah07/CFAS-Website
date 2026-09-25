"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import site from "@/data/site";
import Icon from "@/components/ui/Icon";
import { isActive } from "./NavLink";
import SiteSearch from "./SiteSearch";

// Shortcut tiles at the top of the menu.
const quickAccess = [
  { label: "Watch sermons", href: "/sermons", icon: "play" },
  { label: "Events", href: "/events", icon: "calendar" },
  { label: "Find a fellowship", href: "/campus-fellowships", icon: "users" },
  { label: "Give", href: "/give", icon: "heart" },
];

export default function MenuDrawer() {
  const [open, setOpen] = useState(false);
  // False during server render, true in the browser (needed for the portal).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const pathname = usePathname();
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Close on Escape, lock page scroll, and move focus into the panel.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();
    const button = buttonRef.current;
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      button?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-black/5 active:scale-90 focus-visible:outline-2 focus-visible:outline-gold"
      >
        <span className="relative block h-3.5 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 h-0.5 w-5 rounded bg-charcoal transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
          />
          <span
            className={`absolute top-1.5 left-0 h-0.5 w-5 rounded bg-charcoal transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 rounded bg-charcoal transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
          />
        </span>
      </button>

      {mounted &&
        createPortal(
          <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
            <div
              onClick={close}
              className={`absolute inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
            />
            <nav
              id="site-menu"
              ref={panelRef}
              aria-label="Main"
              inert={!open}
              className={`absolute inset-y-0 left-0 flex w-full max-w-md flex-col overflow-y-auto bg-charcoal text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between px-6 pt-6">
                <p className="font-brand text-lg font-bold tracking-[0.2em] text-gold">{site.shortName}</p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-white/20 active:scale-90"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="px-6 pt-6 md:hidden">
                <SiteSearch dark onNavigate={close} />
              </div>

              <div className="px-6 pt-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">Quick access</p>
                <ul className="mt-3 grid grid-cols-2 gap-2.5">
                  {quickAccess.map((item, i) => (
                    <li
                      key={item.href}
                      style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                      className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"}`}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        className="group flex h-full flex-col gap-5 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-charcoal hover:ring-gold active:scale-95"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold transition-colors group-hover:bg-charcoal/10 group-hover:text-charcoal">
                          <Icon name={item.icon} className="h-5 w-5" />
                        </span>
                        <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                          {item.label}
                          <Icon
                            name="arrow"
                            className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">All pages</p>
              </div>

              <ul className="flex-1 px-4 pt-2 pb-6">
                {site.navLinks.map((link, i) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li
                      key={link.href}
                      style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
                      className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center gap-4 rounded-2xl px-3 py-2.5 text-xl font-semibold transition-colors hover:bg-white/5 ${
                          active ? "text-gold" : "text-white/85 hover:text-white"
                        }`}
                      >
                        <span className="w-6 text-xs font-medium tabular-nums text-white/35">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1">{link.label}</span>
                        <Icon
                          name="arrow"
                          className="h-5 w-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-white/10 px-7 py-6 text-sm text-white/60">
                <p className="italic">&ldquo;{site.motto}&rdquo;</p>
                <p className="mt-4">
                  <a href={`mailto:${site.contact.email}`} className="hover:text-gold">
                    {site.contact.email}
                  </a>
                </p>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
