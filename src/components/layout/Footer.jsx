import Link from "next/link";
import site from "@/data/site";

export default function Footer() {
  const { contact } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-heading text-2xl font-bold tracking-widest text-gold">{site.shortName}</p>
          <p className="mt-1 text-sm">{site.name}</p>
          <p className="mt-4 text-sm italic">&ldquo;{site.motto}&rdquo;</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {site.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-gold">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                {contact.phone}
              </a>
            </li>
          </ul>
          <ul className="mt-4 flex gap-4 text-sm">
            {contact.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs sm:px-6 lg:px-8">
          &copy; {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
