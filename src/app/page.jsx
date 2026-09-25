import Image from "next/image";
import Link from "next/link";
import site from "@/data/site";
import home from "@/data/home";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import ExperienceTabs from "@/components/sections/ExperienceTabs";
import HeroCarousel from "@/components/sections/HeroCarousel";
import SectionHeading from "@/components/sections/SectionHeading";
import SermonRail from "@/components/sections/SermonRail";

const container = "mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8";

function formatEventDate(iso) {
  const date = new Date(`${iso}T00:00:00`);
  return {
    month: date.toLocaleString("en-US", { month: "short" }),
    day: date.getDate(),
    weekday: date.toLocaleString("en-US", { weekday: "long" }),
  };
}

export default function HomePage() {
  const events = [...home.events].sort((a, b) => a.date.localeCompare(b.date));
  const mottoWords = site.motto.split(" ");

  return (
    <>
      <HeroCarousel slides={home.slides} />

      {/* Find the right experience */}
      <section className={`${container} py-24 sm:py-32`}>
        <SectionHeading
          align="center"
          title="Find the right experience for you."
          text="No matter where you are, online, on campus or in person, become a part of all God is doing."
        />
        <Reveal delay={150} className="mt-12">
          <ExperienceTabs experiences={home.experiences} />
        </Reveal>
      </section>

      {/* Mission band */}
      <section className="px-3 sm:px-5">
        <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-charcoal px-6 py-20 text-white grain sm:px-12 sm:py-28 lg:px-20">
          <div className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[24rem] w-[24rem] rounded-full bg-crimson/40 blur-3xl" />

          <div className="relative grid items-center gap-16 lg:grid-cols-[1fr_auto]">
            <div>
              <Reveal as="p" className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
                Our motto · Since {site.founded}
              </Reveal>
              <p className="mt-6 font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
                {mottoWords.map((word, i) => (
                  <Reveal key={i} as="span" delay={i * 70} className="mr-[0.25em] inline-block">
                    {word}
                  </Reveal>
                ))}
              </p>
              <Reveal delay={350} className="mt-8 max-w-2xl border-l-2 border-gold pl-5 text-lg text-white/70">
                <span className="mb-1 block text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                  Our mission
                </span>
                {site.mission}
              </Reveal>
              <Reveal delay={400} className="mt-10 flex flex-wrap gap-3">
                <Button href="/about" arrow>
                  Our story
                </Button>
                <Button href="/leadership" variant="outline" className="text-white">
                  Meet our leaders
                </Button>
              </Reveal>
            </div>

            {/* Logo wrapped in slowly rotating ring text */}
            <Reveal delay={200} className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full animate-spin-slow"
                aria-hidden="true"
              >
                <defs>
                  <path id="ring" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
                </defs>
                <text className="fill-gold font-brand text-[11px] font-bold tracking-[0.35em]">
                  <textPath href="#ring">CHRIST FOR ALL SCHOOLS • WORLDWIDE • EST. {site.founded} •</textPath>
                </text>
              </svg>
              <Image
                src="/images/logo.png"
                alt=""
                width={335}
                height={366}
                className="absolute inset-[22%] h-auto w-[56%] transition-transform duration-500 hover:scale-110 hover:rotate-6"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Latest sermons */}
      <section className={`${container} py-24 sm:py-32`}>
        <SectionHeading
          eyebrow="Watch & listen"
          title="Latest sermons"
          text="Messages to build your faith and send you out."
          action={
            <Button href="/sermons" variant="dark" arrow>
              All sermons
            </Button>
          }
        />
        <Reveal delay={150} className="mt-4">
          <SermonRail sermons={home.sermons} />
        </Reveal>
      </section>

      {/* Upcoming events */}
      <section className="bg-white py-24 sm:py-32">
        <div className={container}>
          <SectionHeading
            eyebrow="Mark your calendar"
            title="Upcoming events"
            action={
              <Button href="/events" variant="outline" arrow>
                See all events
              </Button>
            }
          />
          <ul className="mt-12 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {events.map((event, i) => {
              const { month, day, weekday } = formatEventDate(event.date);
              return (
                <Reveal as="li" key={event.slug} delay={i * 100}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="group relative flex items-center gap-5 py-6 transition-all duration-300 hover:px-4 active:scale-[0.99] sm:gap-8 sm:py-8"
                  >
                    <span className="absolute inset-0 origin-bottom scale-y-0 rounded-3xl bg-sand transition-transform duration-300 group-hover:scale-y-100" />
                    <span className="relative flex h-18 w-18 shrink-0 flex-col items-center justify-center rounded-2xl bg-charcoal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-charcoal sm:h-20 sm:w-20">
                      <span className="text-xs font-semibold tracking-widest uppercase">{month}</span>
                      <span className="font-display text-4xl leading-none">{day}</span>
                    </span>
                    <span className="relative flex-1">
                      <span className="block text-xl font-bold sm:text-2xl">{event.title}</span>
                      <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-charcoal/55">
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="clock" className="h-4 w-4" />
                          {weekday}, {event.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="pin" className="h-4 w-4" />
                          {event.place}
                        </span>
                      </span>
                    </span>
                    <span className="relative hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-charcoal/15 transition-all duration-300 group-hover:-rotate-45 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-white sm:flex">
                      <Icon name="arrow" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Give & connect */}
      <section className={`${container} grid gap-5 py-24 sm:py-32 md:grid-cols-2`}>
        <Reveal className="group relative overflow-hidden rounded-[2rem] bg-gold p-10 sm:p-14">
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-gold-light transition-transform duration-700 group-hover:scale-150" />
          <div className="relative">
            <Icon name="heart" className="h-10 w-10" />
            <h2 className="mt-8 text-4xl font-bold sm:text-5xl">Give</h2>
            <p className="mt-4 max-w-sm text-lg text-charcoal/75">
              Your generosity puts the gospel in schools around the world.
            </p>
            <Button href="/give" variant="dark" size="lg" arrow className="mt-8">
              Give now
            </Button>
          </div>
        </Reveal>
        <Reveal
          delay={120}
          className="group relative overflow-hidden rounded-[2rem] bg-charcoal p-10 text-white sm:p-14"
        >
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-crimson/60 transition-transform duration-700 group-hover:scale-150" />
          <div className="relative">
            <Icon name="chat" className="h-10 w-10 text-gold" />
            <h2 className="mt-8 text-4xl font-bold sm:text-5xl">Get connected</h2>
            <p className="mt-4 max-w-sm text-lg text-white/65">
              New here, need prayer, or want to serve? We&apos;d love to meet you.
            </p>
            <Button href="/contact" variant="light" size="lg" arrow className="mt-8">
              Contact us
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
