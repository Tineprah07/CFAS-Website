"use client";

import Link from "next/link";

// Card with a soft glow that follows the cursor.
export default function SpotlightCard({ href, className = "", children }) {
  const onPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const external = /^https?:/.test(href);

  return (
    <Link
      href={href}
      onPointerMove={onPointerMove}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`group relative block overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(320px circle at var(--x) var(--y), rgb(212 175 55 / 0.22), transparent 60%)",
        }}
      />
      {children}
    </Link>
  );
}
