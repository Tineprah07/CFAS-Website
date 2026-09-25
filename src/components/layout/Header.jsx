"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import site from "@/data/site";
import Button from "@/components/ui/Button";
import MenuDrawer from "./MenuDrawer";
import NavLink from "./NavLink";
import SiteSearch from "./SiteSearch";

const quickLinks = [
  { label: "Events", href: "/events" },
  { label: "Sermons", href: "/sermons" },
  { label: "Campus", href: "/campus-fellowships" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-black/5 bg-white/80 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)] backdrop-blur-xl"
          : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[90rem] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-2 sm:gap-3">
          <MenuDrawer />
          <Link href="/" className="group flex items-center gap-2.5 rounded-xl">
            <Image
              src="/images/logo.png"
              alt=""
              width={335}
              height={366}
              preload
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
            />
            <span className="leading-none">
              <span className="block font-brand text-xl font-bold tracking-[0.18em] text-charcoal">
                {site.shortName}
              </span>
              <span className="mt-0.5 block text-[0.6rem] font-semibold tracking-[0.3em] text-gold-dark uppercase">
                Worldwide
              </span>
            </span>
            <span className="sr-only">{site.name}, home</span>
          </Link>
        </div>

        <div className="hidden w-full max-w-md md:block">
          <SiteSearch />
        </div>

        <nav aria-label="Quick links" className="flex flex-1 items-center justify-end gap-1">
          <ul className="hidden items-center gap-1 lg:flex">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
          <Button href="/give" size="sm" className="ml-2">
            Give
          </Button>
        </nav>
      </div>
    </header>
  );
}
