import Image from "next/image";

// Dark rounded banner at the top of inner pages.
export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-charcoal text-white grain">
        <div className="hero-bg hero-bg--gold opacity-90" />
        <Image
          src="/images/logo.png"
          alt=""
          width={335}
          height={366}
          loading="eager"
          className="pointer-events-none absolute -right-16 -bottom-24 hidden w-96 opacity-15 md:block"
        />
        <div className="relative px-6 pt-24 pb-16 sm:px-12 sm:pt-32 sm:pb-20 lg:px-16">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gold-light uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl animate-fade-up font-display text-6xl leading-[0.9] tracking-wide [animation-delay:100ms] sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          {text && (
            <p className="mt-6 max-w-2xl animate-fade-up text-lg text-white/70 [animation-delay:200ms] sm:text-xl">
              {text}
            </p>
          )}
          {children && <div className="mt-8 animate-fade-up [animation-delay:300ms]">{children}</div>}
        </div>
      </div>
    </section>
  );
}
