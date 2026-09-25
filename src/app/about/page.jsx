import site from "@/data/site";
import about from "@/data/about";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import FaithAccordion from "@/components/sections/FaithAccordion";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";

export const metadata = {
  title: `About · ${site.name}`,
  description: `${site.name} is a ${site.denomination.toLowerCase()} ministry founded in ${site.founded}. ${site.mission}`,
};

const container = "mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8";

export default function AboutPage() {
  const facts = [site.denomination, `Founded ${site.founded}`, "Ghana to the world"];

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={site.name}
        text="Taking the gospel of God's unfailing grace to every campus, and from Ghana to the ends of the world."
      >
        <ul className="flex flex-wrap gap-2">
          {facts.map((fact) => (
            <li
              key={fact}
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white/85"
            >
              {fact}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Our story + milestones */}
      <section className={`${container} grid gap-16 py-24 sm:py-32 lg:grid-cols-2 lg:gap-24`}>
        <div>
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-gold-dark uppercase">Our story</p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Born out of grace.</h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal/70">
            {about.history.map((paragraph, i) => (
              <Reveal as="p" key={i} delay={i * 100}>
                {paragraph}
              </Reveal>
            ))}
          </div>
          <Reveal
            delay={300}
            className="mt-8 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.25)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
              <Icon name="star" className="h-6 w-6" />
            </span>
            <p>
              <span className="block text-xs font-semibold tracking-[0.2em] text-charcoal/45 uppercase">Visionary</span>
              <span className="block text-lg font-bold">{site.founder}</span>
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <ol className="relative space-y-6 before:absolute before:top-3 before:bottom-3 before:left-[1.4rem] before:w-px before:bg-gradient-to-b before:from-gold before:via-gold/40 before:to-transparent">
          {about.milestones.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 150} className="group relative flex gap-6">
              <span className="relative z-10 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal ring-8 ring-cream transition-transform duration-300 group-hover:scale-110">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
              </span>
              <div className="flex-1 rounded-3xl bg-white p-7 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.2)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_-20px_rgb(0_0_0/0.3)]">
                <p className="font-display text-3xl leading-none text-gold-dark">{m.label}</p>
                <h3 className="mt-3 text-xl font-bold">{m.title}</h3>
                <p className="mt-2 leading-relaxed text-charcoal/60">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Mission & vision */}
      <section className={`${container} grid gap-5 md:grid-cols-2`}>
        {[
          { label: "Our mission", text: site.mission, icon: "heart", dark: true },
          { label: "Our vision", text: site.vision, icon: "spark", dark: false },
        ].map((card, i) => (
          <Reveal
            key={card.label}
            delay={i * 120}
            className={`group relative overflow-hidden rounded-[2rem] p-10 sm:p-14 ${
              card.dark ? "bg-charcoal text-white grain" : "bg-gold text-charcoal"
            }`}
          >
            <div
              className={`absolute -right-20 -bottom-20 h-72 w-72 rounded-full transition-transform duration-700 group-hover:scale-150 ${
                card.dark ? "bg-crimson/50" : "bg-gold-light"
              }`}
            />
            <div className="relative">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 ${
                  card.dark ? "bg-gold text-charcoal" : "bg-charcoal text-gold"
                }`}
              >
                <Icon name={card.icon} className="h-7 w-7" />
              </span>
              <h2 className="mt-10 text-sm font-semibold tracking-[0.2em] uppercase opacity-70">{card.label}</h2>
              <p className="mt-4 text-2xl leading-snug font-semibold sm:text-3xl">{card.text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Motto */}
      <section className={`${container} py-24 text-center sm:py-32`}>
        <Reveal as="p" className="text-sm font-semibold tracking-[0.2em] text-gold-dark uppercase">
          Our motto
        </Reveal>
        <p className="mx-auto mt-6 max-w-5xl font-display text-6xl leading-[0.95] sm:text-8xl">
          {site.motto.split(" ").map((word, i) => (
            <Reveal key={i} as="span" delay={i * 70} className="mr-[0.25em] inline-block last:mr-0">
              {word}
            </Reveal>
          ))}
        </p>
      </section>

      {/* Statement of faith */}
      <section className="bg-white py-24 sm:py-32">
        <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="What we believe"
              title="Statement of faith"
              text="The foundational truths that guide everything we do."
            />
          </div>
          <Reveal delay={150}>
            <FaithAccordion items={about.beliefs} />
          </Reveal>
        </div>
      </section>

      {/* Call to action */}
      <section className={`${container} py-24 sm:py-32`}>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-charcoal px-6 py-16 text-center text-white grain sm:px-12 sm:py-20">
          <div className="absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-4xl font-bold sm:text-5xl">Be part of what God is doing.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/65">
              Join a fellowship on your campus, or bring CFAS to your school.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/campus-fellowships" size="lg" arrow>
                Find a fellowship
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="text-white">
                Contact us
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
