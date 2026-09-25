import Image from "next/image";
import Link from "next/link";
import site from "@/data/site";
import Button from "@/components/ui/Button";
import BackToTop from "./BackToTop";

const socialIcons = {
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v7h4v-7h3l1-4h-4V8Z" />,
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
    </>
  ),
};

export default function Footer() {
  const { contact } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-charcoal text-white/70 grain">
        <div className="absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative grid gap-12 px-6 pt-16 sm:px-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/images/logo.png" alt="" width={335} height={366} className="h-14 w-auto" />
              <span className="font-brand text-2xl font-bold tracking-[0.2em] text-gold">{site.shortName}</span>
            </Link>
            <p className="mt-4 text-sm text-white/50">{site.name}</p>
            <p className="mt-6 max-w-sm text-2xl font-semibold text-white">&ldquo;{site.motto}.&rdquo;</p>
            <Button href="/give" className="mt-8" arrow>
              Partner with us
            </Button>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Explore</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {site.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {contact.phone}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex gap-3">
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-charcoal active:scale-90"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {socialIcons[social.label]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 px-6 py-8 text-xs sm:flex-row sm:items-center sm:px-12 lg:px-16">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>

        {/* Oversized outline wordmark */}
        <p
          aria-hidden="true"
          className="pointer-events-none relative -mb-[0.2em] text-center font-display text-[28vw] leading-none text-transparent select-none [-webkit-text-stroke:1px_rgb(212_175_55/0.25)] lg:text-[22rem]"
        >
          {site.shortName}
        </p>
      </div>
    </footer>
  );
}
