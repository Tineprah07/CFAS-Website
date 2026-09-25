import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({ eyebrow, title, text, align = "left", dark = false, action }) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <Reveal className={centered ? "max-w-3xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`text-sm font-semibold tracking-[0.2em] uppercase ${dark ? "text-gold" : "text-gold-dark"}`}>
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 text-4xl font-bold sm:text-5xl">{title}</h2>
        {text && (
          <p className={`mt-4 text-lg font-medium sm:text-xl ${dark ? "text-white/60" : "text-charcoal/55"}`}>{text}</p>
        )}
      </Reveal>
      {action && <Reveal delay={150}>{action}</Reveal>}
    </div>
  );
}
