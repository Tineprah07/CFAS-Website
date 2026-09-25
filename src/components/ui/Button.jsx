"use client";

import Link from "next/link";

const variants = {
  gold: "bg-gold text-charcoal hover:bg-gold-light shadow-[0_8px_24px_-8px_rgb(212_175_55/0.7)]",
  light: "bg-white text-charcoal hover:bg-cream",
  dark: "bg-charcoal text-white hover:bg-charcoal-light",
  outline: "border border-current/25 hover:border-current/60 hover:bg-current/5",
  ghost: "hover:bg-current/10",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

// Spawns an expanding circle from the click point.
function addRipple(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  el.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

export default function Button({
  href,
  variant = "gold",
  size = "md",
  arrow = false,
  className = "",
  children,
  onPointerDown,
  ...props
}) {
  const classes = `group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${variants[variant]} ${sizes[size]} ${className}`;

  const handlePointerDown = (e) => {
    addRipple(e);
    onPointerDown?.(e);
  };

  const content = (
    <>
      {children}
      {arrow && (
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
        >
          <path
            fillRule="evenodd"
            d="M7.2 14.8a.75.75 0 0 1 0-1.06L10.94 10 7.2 6.26a.75.75 0 1 1 1.06-1.06l4.27 4.27a.75.75 0 0 1 0 1.06l-4.27 4.27a.75.75 0 0 1-1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </>
  );

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <Link
        href={href}
        className={classes}
        onPointerDown={handlePointerDown}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onPointerDown={handlePointerDown} {...props}>
      {content}
    </button>
  );
}
