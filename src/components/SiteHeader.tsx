"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSite } from "@/lib/site-content";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/faculty", label: "Faculty" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader({ subtitle = "CBSE · Marikal" }: { subtitle?: string }) {
  const { content } = useSite();
  const schoolName = content["school.name"] || "Oxford Grammar School";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // The homepage hero is light (cream); every other page opens on a dark navy hero.
  // So at the top of inner pages we need light text; once a solid bar appears we use dark.
  const solid = scrolled || open;
  const overDark = !solid && pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-cream/90 shadow-soft backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5">
            <Image src="/logo.png" alt={schoolName} width={48} height={48} className="h-full w-full object-contain" priority />
          </span>
          <span className="leading-tight">
            <span className={`block font-display text-base font-semibold leading-tight transition-colors sm:text-lg ${overDark ? "text-white" : "text-ink"}`}>
              {schoolName}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">{subtitle}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  active ? "text-gold" : overDark ? "text-white/85" : "text-ink/80"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link href="/admissions" className="btn-gold !px-5 !py-2.5">
            Apply →
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-lg border transition-colors lg:hidden ${
            overDark ? "border-white/30" : "border-ink/15"
          }`}
          aria-label="Menu"
        >
          <span className="space-y-1.5">
            <span className={`block h-0.5 w-5 transition ${overDark ? "bg-white" : "bg-ink"} ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 transition ${overDark ? "bg-white" : "bg-ink"} ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 transition ${overDark ? "bg-white" : "bg-ink"} ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-cream/95 backdrop-blur lg:hidden">
          <nav className="container-x flex flex-col py-4">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="border-b border-ink/5 py-3 text-ink/80">
                {l.label}
              </Link>
            ))}
            <Link href="/admissions" className="btn-gold mt-4">
              Apply for Admission →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
