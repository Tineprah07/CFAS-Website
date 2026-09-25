"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Button from "@/components/ui/Button";

const SLIDE_MS = 7000;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const subscribeReducedMotion = (onChange) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

// Decorative artwork on the right side of a slide that has no photo.
function SlideArt({ art, subtitle }) {
  if (art === "logo") {
    return (
      <div className="relative">
        <div className="absolute inset-0 scale-90 rounded-full bg-gold/40 blur-3xl" />
        <Image
          src="/images/logo.png"
          alt=""
          width={335}
          height={366}
          loading="eager"
          className="relative h-auto w-full drop-shadow-2xl"
        />
      </div>
    );
  }
  if (art === "rings") {
    return (
      <div className="relative aspect-square w-full">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-gold/60"
            style={{ animationDelay: `${i * 1.3}s` }}
          />
        ))}
        <span className="absolute inset-[30%] rounded-full bg-gradient-to-br from-gold to-gold-dark shadow-[0_0_80px_rgb(212_175_55/0.6)]" />
      </div>
    );
  }
  if (art === "date") {
    const [month, day] = subtitle.split(/[\s,]+/);
    return (
      <div className="animate-float rounded-[2rem] border border-white/15 bg-white/10 p-5 text-center md:p-8 shadow-2xl backdrop-blur-md">
        <p className="text-sm font-semibold tracking-[0.3em] text-gold-light uppercase">{month}</p>
        <p className="font-display text-7xl leading-none text-white md:text-[9rem]">{day}</p>
      </div>
    );
  }
  return null;
}

export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const paused = userPaused || tabHidden;
  const pointerStart = useRef(null);
  const count = slides.length;

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay is driven by the progress bar's CSS animation, so it's skipped
  // for people who prefer reduced motion.
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  // Pause while the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // Swipe on touch screens.
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") pointerStart.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (pointerStart.current === null) return;
    const dx = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      onKeyDown={onKeyDown}
      className="px-3 pt-3 sm:px-5 sm:pt-5"
    >
      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
        className="relative mx-auto h-[min(82svh,760px)] min-h-[560px] max-w-[90rem] touch-pan-y overflow-hidden rounded-[2rem] bg-charcoal text-white shadow-[0_30px_80px_-30px_rgb(0_0_0/0.5)]"
      >
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={`absolute inset-0 transition-opacity duration-1000 ${active ? "z-10 opacity-100" : "opacity-0"}`}
            >
              {/* Background: slow zoom restarts each time the slide becomes active. */}
              <div
                key={active ? `on-${index}` : "off"}
                className={`absolute inset-0 grain ${active ? "animate-ken-burns" : ""}`}
              >
                <div className={`hero-bg hero-bg--${slide.tone}`} />
                {/* Portrait photos sit at the top on phones (clear of the text) and on
                    the right on wider screens, fading into the background. */}
                {slide.image && (
                  <div className="absolute inset-x-0 top-0 h-[62%] [mask-image:linear-gradient(to_bottom,black_45%,transparent)] md:inset-y-0 md:left-auto md:h-auto md:w-[58%] md:[mask-image:linear-gradient(to_right,transparent,black_40%)]">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt ?? ""}
                      fill
                      loading="eager"
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover object-[center_15%]"
                    />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 md:from-black/85 md:via-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

              {!slide.image && (
                <div className="pointer-events-none absolute top-[10%] left-1/2 w-36 -translate-x-1/2 md:top-1/2 md:right-[8%] md:left-auto md:w-[min(30vw,380px)] md:translate-x-0 md:-translate-y-[60%]">
                  <SlideArt art={slide.art} subtitle={slide.subtitle} />
                </div>
              )}

              {active && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 p-6 pb-20 sm:p-12 sm:pb-20 lg:flex-row lg:items-end lg:justify-between lg:p-16 lg:pb-20">
                  <div className="max-w-2xl">
                    <p className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gold-light uppercase backdrop-blur">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                      {slide.eyebrow}
                    </p>
                    <h2 className="mt-4 animate-fade-up font-display text-6xl leading-[0.9] tracking-wide [animation-delay:100ms] sm:text-7xl lg:text-8xl">
                      {slide.title}
                    </h2>
                    <p className="mt-4 animate-fade-up text-xl font-bold [animation-delay:200ms] sm:text-2xl">
                      {slide.subtitle}
                    </p>
                    <p className="mt-1 animate-fade-up text-white/70 [animation-delay:260ms]">{slide.caption}</p>
                  </div>
                  <div className="flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:350ms]">
                    <Button href={slide.primary.href} variant="light" size="lg" className="min-w-52">
                      {slide.primary.label}
                    </Button>
                    <Button href={slide.secondary.href} variant="ghost" size="lg" arrow className="text-white">
                      {slide.secondary.label}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Arrows */}
        {[
          { label: "Previous slide", onClick: prev, side: "left-4 sm:left-6", d: "M15 18l-6-6 6-6" },
          { label: "Next slide", onClick: next, side: "right-4 sm:right-6", d: "M9 6l6 6-6 6" },
        ].map((arrow) => (
          <button
            key={arrow.label}
            type="button"
            onClick={arrow.onClick}
            aria-label={arrow.label}
            className={`absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white hover:text-charcoal active:scale-90 sm:flex ${arrow.side}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={arrow.d} />
            </svg>
          </button>
        ))}

        {/* Dots with a progress fill that advances the slide when it completes. */}
        <div className="absolute inset-x-0 bottom-7 z-20 flex items-center justify-center gap-2">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                aria-current={active}
                className="group flex h-6 items-center"
              >
                <span
                  className={`relative block h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                    active ? "w-12 bg-white/30" : "w-1.5 bg-white/50 group-hover:bg-white"
                  }`}
                >
                  {active && !reducedMotion && (
                    <span
                      key={index}
                      onAnimationEnd={next}
                      className="absolute inset-0 origin-left scale-x-0 rounded-full bg-white"
                      style={{
                        animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                  {active && reducedMotion && <span className="absolute inset-0 rounded-full bg-white" />}
                </span>
              </button>
            );
          })}
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setUserPaused(!userPaused)}
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 active:scale-90"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                {userPaused ? <path d="M8 5.5v13l11-6.5-11-6.5Z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
