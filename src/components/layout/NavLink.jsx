"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// "/" only matches the home page; other links also match their sub-pages
// (e.g. /events/harvest-sunday highlights "Events").
export function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Header link with an underline that grows in from the left.
export default function NavLink({ href, children, className = "", onClick }) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`group relative inline-flex h-10 items-center rounded-full px-3 text-sm font-medium transition-colors ${
        active ? "text-charcoal" : "text-charcoal/70 hover:text-charcoal"
      } ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-gold transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}
