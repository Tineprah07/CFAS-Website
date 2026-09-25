"use client";

import Link from "next/link";
import { useRef } from "react";
import Icon from "@/components/ui/Icon";

// Horizontal, snap-scrolling row of sermon cards with arrow controls.
export default function SermonRail({ sermons }) {
  const railRef = useRef(null);

  const scroll = (dir) => {
    const rail = railRef.current;
    rail?.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="group/rail relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-20 z-10 hidden items-center justify-between md:flex lg:-inset-x-5">
        {[
          { dir: -1, label: "Scroll sermons left", d: "M15 18l-6-6 6-6" },
          { dir: 1, label: "Scroll sermons right", d: "M9 6l6 6-6 6" },
        ].map((b) => (
          <button
            key={b.dir}
            type="button"
            onClick={() => scroll(b.dir)}
            aria-label={b.label}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.35)] transition-all duration-300 hover:scale-110 hover:bg-charcoal hover:text-white active:scale-90 md:opacity-0 md:group-hover/rail:opacity-100 md:focus-visible:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={b.d} />
            </svg>
          </button>
        ))}
      </div>

      <ul
        ref={railRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
      >
        {sermons.map((sermon) => (
          <li key={sermon.slug} className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]">
            <Link
              href={`/sermons/${sermon.slug}`}
              className="group block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <div className="relative aspect-video overflow-hidden rounded-3xl bg-charcoal grain">
                <div
                  className={`hero-bg hero-bg--${sermon.tone} transition-transform duration-700 group-hover:scale-110`}
                />
                <p className="absolute inset-x-6 bottom-5 font-display text-4xl leading-none text-white">
                  {sermon.title}
                </p>
                <span className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-charcoal">
                  <Icon name="play" className="h-5 w-5 translate-x-0.5 fill-current" />
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-gold-dark uppercase">{sermon.series}</p>
                  <h3 className="mt-1 font-bold transition-colors group-hover:text-gold-dark">{sermon.title}</h3>
                </div>
                <p className="shrink-0 text-sm text-charcoal/50">{sermon.date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
