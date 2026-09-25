"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// "/" only matches the home page; other links also match their sub-pages
// (e.g. /events/harvest-sunday highlights "Events").
function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLink({ href, children, className = "", onClick }) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`transition-colors ${
        active ? "text-gold-light underline decoration-2 underline-offset-8" : "text-gold hover:text-gold-light"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
