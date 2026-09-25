import Image from "next/image";
import Link from "next/link";
import site from "@/data/site";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-charcoal text-gold">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt={`${site.name} logo`}
            width={335}
            height={366}
            priority
            className="h-12 w-auto"
          />
          <span className="font-heading text-xl font-bold tracking-widest">{site.shortName}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {site.navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu links={site.navLinks} />
      </div>
    </header>
  );
}
